-- ============================================================
-- MIGRATION: Self-contained profile setup with sex column
-- Run this in your Supabase SQL Editor if profiles aren't being created
-- ============================================================

-- 1. Make nullable columns for progressive onboarding
ALTER TABLE profiles ALTER COLUMN date_of_birth DROP NOT NULL;
ALTER TABLE profiles ALTER COLUMN qr_data DROP NOT NULL;

-- 2. Add sex column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'sex'
  ) THEN
    ALTER TABLE profiles ADD COLUMN sex TEXT;
  END IF;
END $$;

-- 3. Function to generate a unique MediPhi ID
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

-- 4. Trigger function to create profile on new auth user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_full_name TEXT;
  user_dob TEXT;
  user_sex TEXT;
  user_phone TEXT;
  new_medi_phi_id TEXT;
BEGIN
  -- Extract email
  user_email := NEW.email;

  -- Extract full_name from user metadata
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    ''
  );

  -- Extract optional metadata
  user_dob := NEW.raw_user_meta_data->>'date_of_birth';
  user_sex := NEW.raw_user_meta_data->>'sex';
  user_phone := NEW.raw_user_meta_data->>'phone';

  -- Generate unique MediPhi ID
  new_medi_phi_id := generate_medi_phi_id();

  -- Insert into profiles with all available metadata
  INSERT INTO profiles (
    id,
    mediphi_id,
    full_name,
    email,
    date_of_birth,
    sex,
    phone,
    qr_data
  ) VALUES (
    NEW.id,
    new_medi_phi_id,
    user_full_name,
    user_email,
    CASE WHEN user_dob IS NOT NULL AND user_dob <> '' THEN user_dob::DATE ELSE NULL END,
    user_sex,
    user_phone,
    new_medi_phi_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Drop existing trigger if any, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 6. Verify: Show current triggers on auth.users
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'users'
  AND event_object_schema = 'auth';
