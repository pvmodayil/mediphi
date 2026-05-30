export type HospitalType = "hospital" | "lab" | "clinic";

export type StaffRole = "doctor" | "nurse" | "lab_technician" | "admin";

export type DocumentOcrStatus = "pending" | "processing" | "completed" | "failed";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type ShareStatus = "pending" | "approved" | "rejected";

export type QrSessionType = "patient_scan_hospital" | "hospital_scan_patient";

export type QrSessionStatus = "pending" | "completed" | "expired";

export type RecordSourceType = "hospital_push" | "patient_upload";

export interface Profile {
  id: string;
  mediphi_id: string;
  full_name: string;
  date_of_birth: string;
  phone: string | null;
  email: string;
  qr_data: string;
  created_at: string;
}

export interface Hospital {
  id: string;
  name: string;
  registration_number: string;
  type: HospitalType;
  address: string | null;
  qr_data: string;
  verified: boolean;
  created_at: string;
}

export interface Staff {
  id: string;
  hospital_id: string;
  role: StaffRole;
  full_name: string;
  created_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  fhir_resource_type: string;
  fhir_data: Record<string, unknown>;
  source_type: RecordSourceType;
  source_id: string | null;
  document_id: string | null;
  recorded_at: string;
  created_at: string;
}

export interface Document {
  id: string;
  patient_id: string;
  storage_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  ocr_status: DocumentOcrStatus;
  ocr_result: Record<string, unknown> | null;
  created_at: string;
}

export interface RecordShare {
  id: string;
  patient_id: string;
  hospital_id: string;
  scope: string[];
  expires_at: string | null;
  approved: boolean;
  created_at: string;
}

export interface QrSession {
  id: string;
  token: string;
  session_type: QrSessionType;
  patient_id: string | null;
  hospital_id: string | null;
  status: QrSessionStatus;
  expires_at: string;
  created_at: string;
}

export interface PendingSubmission {
  id: string;
  patient_id: string;
  hospital_id: string;
  fhir_resource_type: string;
  fhir_data: Record<string, unknown>;
  document_id: string | null;
  status: SubmissionStatus;
  created_at: string;
}
