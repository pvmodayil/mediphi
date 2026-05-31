-- Add sex column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sex TEXT;

-- Update the trigger function to capture DOB, sex, and phone from metadata
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

  -- Extract date_of_birth from user metadata
  user_dob := NEW.raw_user_meta_data->>'date_of_birth';

  -- Extract sex from user metadata
  user_sex := NEW.raw_user_meta_data->>'sex';

  -- Extract phone from user metadata
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

-- Also create a function to update profile metadata (for progressive onboarding)
CREATE OR REPLACE FUNCTION update_profile_metadata(
  user_id UUID,
  user_dob DATE DEFAULT NULL,
  user_sex TEXT DEFAULT NULL,
  user_phone TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET
    date_of_birth = COALESCE(user_dob, date_of_birth),
    sex = COALESCE(user_sex, sex),
    phone = COALESCE(user_phone, phone)
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
