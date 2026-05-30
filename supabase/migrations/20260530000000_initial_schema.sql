-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
CREATE TYPE hospital_type AS ENUM ('hospital', 'lab', 'clinic');
CREATE TYPE staff_role AS ENUM ('doctor', 'nurse', 'lab_technician', 'admin');
CREATE TYPE document_ocr_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE qr_session_type AS ENUM ('patient_scan_hospital', 'hospital_scan_patient');
CREATE TYPE qr_session_status AS ENUM ('pending', 'completed', 'expired');
CREATE TYPE record_source_type AS ENUM ('hospital_push', 'patient_upload');

-- Profiles table (patients)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  mediphi_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  qr_data TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Hospitals table
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  type hospital_type NOT NULL,
  address TEXT,
  qr_data TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE NOT NULL,
  role staff_role NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Medical records table (FHIR resources as JSONB)
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  fhir_resource_type TEXT NOT NULL,
  fhir_data JSONB NOT NULL,
  source_type record_source_type NOT NULL,
  source_id UUID,
  document_id UUID,
  recorded_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  ocr_status document_ocr_status DEFAULT 'pending' NOT NULL,
  ocr_result JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Record shares table
CREATE TABLE record_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE NOT NULL,
  scope JSONB NOT NULL,
  expires_at TIMESTAMPTZ,
  approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- QR sessions table
CREATE TABLE qr_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  session_type qr_session_type NOT NULL,
  patient_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
  status qr_session_status DEFAULT 'pending' NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Pending submissions table
CREATE TABLE pending_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE NOT NULL,
  fhir_resource_type TEXT NOT NULL,
  fhir_data JSONB NOT NULL,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  status submission_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_profiles_mediphi_id ON profiles(mediphi_id);
CREATE INDEX idx_hospitals_registration_number ON hospitals(registration_number);
CREATE INDEX idx_staff_hospital_id ON staff(hospital_id);
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_fhir_resource_type ON medical_records(fhir_resource_type);
CREATE INDEX idx_documents_patient_id ON documents(patient_id);
CREATE INDEX idx_documents_ocr_status ON documents(ocr_status);
CREATE INDEX idx_record_shares_patient_id ON record_shares(patient_id);
CREATE INDEX idx_record_shares_hospital_id ON record_shares(hospital_id);
CREATE INDEX idx_qr_sessions_token ON qr_sessions(token);
CREATE INDEX idx_qr_sessions_patient_id ON qr_sessions(patient_id);
CREATE INDEX idx_qr_sessions_hospital_id ON qr_sessions(hospital_id);
CREATE INDEX idx_pending_submissions_patient_id ON pending_submissions(patient_id);
CREATE INDEX idx_pending_submissions_hospital_id ON pending_submissions(hospital_id);
CREATE INDEX idx_pending_submissions_status ON pending_submissions(status);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE record_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Patients can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Patients can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Patients can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Hospitals policies
CREATE POLICY "Anyone can view verified hospitals"
  ON hospitals FOR SELECT
  USING (verified = TRUE);

CREATE POLICY "Staff can view their hospital"
  ON hospitals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = hospitals.id
      AND staff.id = auth.uid()
    )
  );

CREATE POLICY "Hospital admins can update their hospital"
  ON hospitals FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = hospitals.id
      AND staff.id = auth.uid()
      AND staff.role = 'admin'
    )
  );

-- Staff policies
CREATE POLICY "Staff can view their own record"
  ON staff FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Hospital admins can manage their staff"
  ON staff FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM staff AS admin
      WHERE admin.hospital_id = staff.hospital_id
      AND admin.id = auth.uid()
      AND admin.role = 'admin'
    )
  );

CREATE POLICY "Staff can insert their own record"
  ON staff FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Medical records policies
CREATE POLICY "Patients can view their own records"
  ON medical_records FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own records"
  ON medical_records FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can delete their own records"
  ON medical_records FOR DELETE
  USING (auth.uid() = patient_id);

CREATE POLICY "Hospitals can view granted records"
  ON medical_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM record_shares
      WHERE record_shares.patient_id = medical_records.patient_id
      AND record_shares.hospital_id IN (
        SELECT hospital_id FROM staff WHERE staff.id = auth.uid()
      )
      AND record_shares.approved = TRUE
      AND (record_shares.expires_at IS NULL OR record_shares.expires_at > NOW())
      AND medical_records.fhir_resource_type = ANY(
        SELECT jsonb_array_elements_text(record_shares.scope)
      )
    )
  );

-- Documents policies
CREATE POLICY "Patients can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can delete their own documents"
  ON documents FOR DELETE
  USING (auth.uid() = patient_id);

-- Record shares policies
CREATE POLICY "Patients can manage their own shares"
  ON record_shares FOR ALL
  USING (auth.uid() = patient_id);

CREATE POLICY "Hospitals can view shares granted to them"
  ON record_shares FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = record_shares.hospital_id
      AND staff.id = auth.uid()
    )
  );

-- QR sessions policies
CREATE POLICY "Patients can view their own QR sessions"
  ON qr_sessions FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create QR sessions"
  ON qr_sessions FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own QR sessions"
  ON qr_sessions FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Hospitals can view QR sessions"
  ON qr_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = qr_sessions.hospital_id
      AND staff.id = auth.uid()
    )
  );

CREATE POLICY "Hospitals can create QR sessions"
  ON qr_sessions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = qr_sessions.hospital_id
      AND staff.id = auth.uid()
    )
  );

-- Pending submissions policies
CREATE POLICY "Patients can view submissions targeting them"
  ON pending_submissions FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can update submissions targeting them"
  ON pending_submissions FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Hospitals can create submissions"
  ON pending_submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = pending_submissions.hospital_id
      AND staff.id = auth.uid()
    )
  );

CREATE POLICY "Hospitals can view their own submissions"
  ON pending_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff
      WHERE staff.hospital_id = pending_submissions.hospital_id
      AND staff.id = auth.uid()
    )
  );
