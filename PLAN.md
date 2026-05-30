# MediPhi — Project Plan

Your medical data, truly yours. Instantly shareable.

## Overview

MediPhi solves the fragmentation of medical records across hospitals. Patients own their data tied to a unique MediPhi ID, and can instantly register at any hospital by scanning a QR code. Hospitals can push lab results directly to patients, and patients can upload their own records with automatic OCR extraction. Built on the HL7 FHIR R4 standard for interoperability.

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Patient App | React Native (Expo) | Cross-platform iOS + Android, leverages existing React knowledge |
| Hospital Dashboard | Next.js | Repurpose existing project, SEO-friendly public pages |
| Backend (BaaS) | Supabase | Auth, PostgreSQL, Storage, RLS, Realtime, Edge Functions |
| Medical Data Standard | HL7 FHIR R4 | Industry standard, JSON-native, future-proof interoperability |
| OCR | Google Cloud Vision / Document AI | Best accuracy for medical documents, HIPAA BAA available |
| QR Scanning | `expo-camera` (scan) + `qrcode.react` (generate) | React Native native module + existing dep |
| Monorepo | Turborepo | Efficient orchestration of multiple apps/packages |

---

## Project Structure

```
mediphi/
├── apps/
│   ├── mobile/              # Expo React Native (patient-facing mobile app)
│   └── dashboard/           # Next.js (hospital/lab web portal)
├── packages/
│   └── shared/              # FHIR types, generated Supabase types, constants, utilities
├── supabase/
│   ├── migrations/          # Database schema migrations
│   ├── edge-functions/      # OCR pipeline, notification dispatcher, QR session manager
│   └── seed/                # Test/development seed data
└── PLAN.md                  # This document
```

---

## Architecture

```
                  ┌─────────────────────┐
                  │   Public Landing     │
                  │   (marketing site)   │
                  └─────────────────────┘

  ┌──────────────────────┐       ┌──────────────────────┐
  │    Patient Mobile     │       │   Hospital Dashboard  │
  │    (React Native)     │       │    (Next.js Web)      │
  │                      │       │                      │
  │ • Auth + MediPhi ID  │       │ • Staff Login         │
  │ • QR Scan (both dir) │       │ • Scan Patient QR     │
  │ • Medical Records    │       │ • View/Request Records│
  │ • Upload + OCR       │       │ • Push Data to Patient│
  │ • Share/Access Grant │       │ • Patient Queue Mgmt  │
  └──────────┬───────────┘       └──────────┬───────────┘
             │                              │
             └──────────┬───────────────────┘
                  ┌─────▼──────┐
                  │  Supabase   │
                  │             │
                  │ • Auth      │
                  │ • PG (FHIR) │
                  │ • Storage   │
                  │ • RLS       │
                  │ • Realtime  │
                  │ • Edge Fns  │
                  └─────────────┘
```

---

## Database Schema

### `profiles`
Patient identity with unique MediPhi ID.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Auth user reference |
| `mediphi_id` | text (unique) | Human-readable unique ID (e.g. `MPH-XXXXXX`) |
| `full_name` | text | Patient's full name |
| `date_of_birth` | date | DOB for identity verification |
| `phone` | text | Contact phone |
| `email` | text | Contact email |
| `qr_data` | text | Encoded QR payload (MediPhi ID + auth token) |
| `created_at` | timestamptz | Account creation timestamp |

### `hospitals`
Registered hospital and laboratory entities.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Hospital unique ID |
| `name` | text | Hospital/lab name |
| `registration_number` | text (unique) | Official registration number |
| `type` | enum | `hospital`, `lab`, `clinic` |
| `address` | text | Physical address |
| `qr_data` | text | Encoded QR payload for patient scanning |
| `verified` | boolean | Whether entity is verified |
| `created_at` | timestamptz | Registration timestamp |

### `staff`
Hospital employee accounts.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Auth user reference |
| `hospital_id` | uuid (FK → hospitals) | Associated hospital |
| `role` | enum | `doctor`, `nurse`, `lab_technician`, `admin` |
| `full_name` | text | Staff name |
| `created_at` | timestamptz | Account creation timestamp |

### `medical_records`
FHIR resources stored as JSONB.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Record unique ID |
| `patient_id` | uuid (FK → profiles) | Owning patient |
| `fhir_resource_type` | text | FHIR resource type (Observation, Condition, MedicationStatement, Immunization, DiagnosticReport) |
| `fhir_data` | jsonb | Full FHIR R4 resource JSON |
| `source_type` | enum | `hospital_push`, `patient_upload` |
| `source_id` | uuid | FK to hospitals or OCR pipeline |
| `document_id` | uuid (FK → documents) | Reference to original document if applicable |
| `recorded_at` | timestamptz | When the medical event occurred |
| `created_at` | timestamptz | When the record was created in system |

### `documents`
Original uploaded files stored in Supabase Storage.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Document unique ID |
| `patient_id` | uuid (FK → profiles) | Owning patient |
| `storage_path` | text | Path in Supabase Storage bucket |
| `file_name` | text | Original filename |
| `mime_type` | text | File MIME type |
| `file_size` | integer | File size in bytes |
| `ocr_status` | enum | `pending`, `processing`, `completed`, `failed` |
| `ocr_result` | jsonb | Extracted FHIR data from OCR |
| `created_at` | timestamptz | Upload timestamp |

### `record_shares`
Granular access grants from patient to hospital.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Share unique ID |
| `patient_id` | uuid (FK → profiles) | Granting patient |
| `hospital_id` | uuid (FK → hospitals) | Receiving hospital |
| `scope` | jsonb | What record types are shared (e.g. `["Observation", "Condition"]`) |
| `expires_at` | timestamptz | Access expiry (null = permanent) |
| `approved` | boolean | Whether patient has approved |
| `created_at` | timestamptz | Grant creation timestamp |

### `qr_sessions`
Ephemeral tokens for bidirectional QR scan flow.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Session unique ID |
| `token` | text (unique) | One-time use token |
| `session_type` | enum | `patient_scan_hospital`, `hospital_scan_patient` |
| `patient_id` | uuid (FK → profiles, nullable) | Patient involved |
| `hospital_id` | uuid (FK → hospitals, nullable) | Hospital involved |
| `status` | enum | `pending`, `completed`, `expired` |
| `expires_at` | timestamptz | Session expiry |
| `created_at` | timestamptz | Creation timestamp |

### `pending_submissions`
Records pushed by hospitals awaiting patient approval.

| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Submission unique ID |
| `patient_id` | uuid (FK → profiles) | Target patient |
| `hospital_id` | uuid (FK → hospitals) | Submitting hospital |
| `fhir_resource_type` | text | FHIR resource type |
| `fhir_data` | jsonb | FHIR resource data |
| `document_id` | uuid (FK → documents, nullable) | Reference to attached document |
| `status` | enum | `pending`, `approved`, `rejected` |
| `created_at` | timestamptz | Submission timestamp |

---

## Core Flows

### Flow 1: Patient Onboarding
```
Patient downloads app → Signs up (email + password)
  → System generates unique mediPhi_id (MPH-XXXXXX)
  → Personal QR code rendered (encodes mediPhi_id + auth token)
  → Profile created in Supabase
```

### Flow 2: Patient Visits a New Hospital
```
Patient arrives at hospital → Opens app → Scans hospital's QR code at reception
  → Hospital entity linked to patient's profile
  → Hospital appears in patient's "My Hospitals" list
  → (Optional) Patient can pre-configure what records this hospital can access
```

### Flow 3: Hospital Requests Access to Patient Records
```
Hospital staff logs into dashboard → Enters patient's mediPhi_id OR scans patient QR
  → QR session created
  → Patient receives push notification: "Hospital X is requesting access to your medical records"
  → Patient taps notification → sees request details (what data, which hospital)
  → Patient approves/denies (can set auto-approve for trusted hospitals)
  → If approved: record_share created with scope + expiry
  → Hospital can now view granted records within limits
```

### Flow 4: Lab/Hospital Pushes Test Results
```
Lab technician completes tests → Opens hospital dashboard → "Push to Patient"
  → Enters patient mediPhi_id or scans patient QR
  → Fills structured form or uploads report PDF
  → Data mapped to FHIR Observation resource
  → Submitted to patient's pending_submissions
  → Patient receives push notification: "New lab results from Hospital X"
  → Patient reviews results → Approves (stored in medical_records)
```

### Flow 5: Patient Uploads Own Records
```
Patient taps "Add Record" → Takes photo or selects file from device
  → File uploaded to Supabase Storage (documents table created, ocr_status = pending)
  → Edge function triggered: "OCR Pipeline"
  → Google Cloud Vision processes image/PDF
  → Extracted text parsed and mapped to FHIR resource(s)
  → ocr_status = completed, ocr_result populated with FHIR JSON
  → Patient reviews extracted data → confirms or edits
  → Confirmed data saved to medical_records
```

---

## Edge Functions (Supabase)

### OCR Pipeline
Triggered on `INSERT` to `documents` table with `ocr_status = 'pending'`.
- Downloads file from Supabase Storage
- Sends to Google Cloud Vision / Document AI API
- Parses OCR text output
- Maps to appropriate FHIR resource type(s)
- Updates `documents.ocr_result` and `documents.ocr_status`

### Notification Dispatcher
Triggered on relevant database events (new pending_submission, new record_share request).
- Queries recipient's device token
- Sends push notification via Expo Push API or FCM/APNs

### QR Session Manager
Manages ephemeral QR session lifecycle.
- Creates sessions on scan initiation
- Validates tokens
- Expires stale sessions
- Handles bidirectional flow logic

---

## Row-Level Security (RLS) Policies

| Table | Policy |
|---|---|
| `profiles` | Patients can read/update only their own profile |
| `hospitals` | Public read for verified hospitals; staff can update their own hospital |
| `staff` | Hospital admin can manage their staff list |
| `medical_records` | Patients see only their own records; hospitals see records granted via `record_shares` |
| `documents` | Patients see/manage only their own documents |
| `record_shares` | Patients manage their own shares; hospitals read shares granted to them |
| `pending_submissions` | Patients see submissions targeting them; hospitals see submissions they created |

---

## Implementation Phases

### Phase 1: Foundation
- [ ] 1.1 Initialize monorepo with Turborepo + npm workspaces
- [ ] 1.2 Scaffold `apps/mobile` — Expo (React Native) with TypeScript
- [ ] 1.3 Repurpose existing Next.js project → `apps/dashboard`
- [ ] 1.4 Create `packages/shared` with FHIR types, Supabase types, constants
- [ ] 1.5 Set up Supabase project — auth, database, storage

### Phase 2: Database & Auth
- [ ] 2.1 Write and run schema migrations for all tables
- [ ] 2.2 Configure Row-Level Security policies
- [ ] 2.3 Implement patient authentication flow (signup → mediPhi ID generation)
- [ ] 2.4 Implement hospital staff authentication flow
- [ ] 2.5 Generate TypeScript types from Supabase schema

### Phase 3: Patient Mobile App
- [ ] 3.1 Onboarding screens — signup/login, mediPhi ID display, personal QR code
- [ ] 3.2 Scan hospital QR — `expo-camera` integration, hospital linking
- [ ] 3.3 Show patient QR — display scannable QR for hospital staff
- [ ] 3.4 Medical records viewer — FHIR-categorized list, detail views per resource type
- [ ] 3.5 Upload + OCR — camera capture / file picker → upload → OCR processing → FHIR mapping → review & confirm
- [ ] 3.6 Sharing controls — grant/revoke hospital access, set expiry, manage pending requests
- [ ] 3.7 Push notifications — alert on new results, access requests, approvals

### Phase 4: Hospital Web Dashboard
- [ ] 4.1 Staff login page
- [ ] 4.2 Patient lookup by mediPhi ID or webcam QR scan
- [ ] 4.3 Medical record viewer (FHIR-rendered, within granted scope)
- [ ] 4.4 Push data flow — structured form for lab results → FHIR mapping → submit to patient
- [ ] 4.5 Patient queue dashboard — currently linked patients, pending access requests

### Phase 5: Edge Functions & OCR Pipeline
- [ ] 5.1 OCR pipeline — Google Cloud Vision integration, FHIR mapping logic
- [ ] 5.2 Notification dispatcher — push notification triggers
- [ ] 5.3 QR session manager — ephemeral token lifecycle

---

## App Screens (Patient Mobile)

```
Root Navigator (Stack)
├── Auth Stack (unauthenticated)
│   ├── Welcome
│   ├── Login
│   └── Signup
│
├── Onboarding Stack (first-time)
│   ├── MediPhi ID Reveal
│   └── Set Up Biometrics
│
└── Main Tabs (authenticated)
    ├── Home Tab
    │   ├── Dashboard (quick actions, recent records, notifications)
    │   └── My QR Code (fullscreen for scanning)
    │
    ├── Records Tab
    │   ├── Records List (filtered by FHIR category: Labs, Diagnoses, Medications, Vaccines, Imaging)
    │   └── Record Detail (FHIR resource rendered, share button)
    │
    ├── Scan Tab (center action button)
    │   ├── Camera Scanner (scan hospital QR)
    │   └── Scan Result (confirm hospital link)
    │
    ├── Share Tab
    │   ├── My Hospitals (linked hospitals list)
    │   ├── Pending Requests (access requests)
    │   ├── Active Shares (manage active grants)
    │   └── Share Settings (per-hospital scope config)
    │
    └── Profile Tab
        ├── Profile Info
        ├── Pending Submissions (approve hospital-pushed records)
        ├── Upload History
        └── Settings
```

## Dashboard Pages (Hospital Web)

```
/ (login redirect)
├── /login
├── /dashboard
│   ├── Patient Queue (currently linked patients)
│   ├── Pending Requests (awaiting patient approval)
│   └── Quick Scan (webcam QR scanner)
├── /patients
│   ├── Search (by MediPhi ID or name)
│   └── [patientId]
│       ├── Overview (demographics, active shares)
│       ├── Medical Records (FHIR viewer, granted scope)
│       └── Push Data (submit new records/results)
├── /staff
│   └── Manage staff accounts
└── /settings
    └── Hospital profile, QR code for patients
```
