-- Make date_of_birth and qr_data nullable to support progressive onboarding
ALTER TABLE profiles ALTER COLUMN date_of_birth DROP NOT NULL;
ALTER TABLE profiles ALTER COLUMN qr_data DROP NOT NULL;

-- Function to generate a unique MediPhi ID
CREATE OR REPLACE FUNCTION generate_medi_phi_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  id_exists BOOLEAN;
  max_attempts INT := 10;
  attempt INT := 0;
BEGIN
  LOOP
    attempt := attempt + 1;
    IF attempt > max_attempts THEN
      RAISE EXCEPTION 'Could not generate unique MediPhi ID after % attempts', max_attempts;
    END IF;

    new_id := 'MPH-';
    FOR i IN 1..6 LOOP
      new_id := new_id || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;

    SELECT EXISTS(SELECT 1 FROM profiles WHERE mediphi_id = new_id) INTO id_exists;
    EXIT WHEN NOT id_exists;
  END LOOP;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to create profile on new auth user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_full_name TEXT;
  new_medi_phi_id TEXT;
BEGIN
  -- Extract email
  user_email := NEW.email;

  -- Extract full_name from user metadata, fallback to empty string
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    ''
  );

  -- Generate unique MediPhi ID
  new_medi_phi_id := generate_medi_phi_id();

  -- Insert into profiles
  INSERT INTO profiles (
    id,
    mediphi_id,
    full_name,
    email,
    qr_data
  ) VALUES (
    NEW.id,
    new_medi_phi_id,
    user_full_name,
    user_email,
    new_medi_phi_id  -- Initially qr_data is just the mediPhi ID
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
