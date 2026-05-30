export const MEDIPHI_ID_PREFIX = "MPH";

export const MEDIPHI_ID_LENGTH = 6;

export const QR_SESSION_EXPIRY_MINUTES = 5;

export const FHIR_RESOURCE_TYPES = [
  "Observation",
  "Condition",
  "MedicationStatement",
  "Immunization",
  "DiagnosticReport",
  "Patient",
] as const;

export const FHIR_RESOURCE_LABELS: Record<string, string> = {
  Observation: "Lab Results",
  Condition: "Diagnoses",
  MedicationStatement: "Medications",
  Immunization: "Vaccinations",
  DiagnosticReport: "Reports",
  Patient: "Patient Info",
};

export const HOSPITAL_TYPES = ["hospital", "lab", "clinic"] as const;

export const STAFF_ROLES = ["doctor", "nurse", "lab_technician", "admin"] as const;

export const DOCUMENT_OCR_STATUSES = ["pending", "processing", "completed", "failed"] as const;

export const SUBMISSION_STATUSES = ["pending", "approved", "rejected"] as const;

export const SHARE_STATUSES = ["pending", "approved", "rejected"] as const;
