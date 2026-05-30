# MediPhi — Agent Context

> This file is optimized for coding agents. It contains architecture, conventions, known pitfalls, and build commands. For human contributors, see `README.md`.

---

## 1. Project Overview

MediPhi is a **medical identity vault** built on **FHIR R4**. Patients store health records, generate QR codes for instant hospital access, and control data sharing via granular permissions.

**Key features:**
- One `MPH-{id}` identity across all hospitals
- QR-code-based instant record retrieval
- Granular record sharing (time-bound, scope-limited)
- FHIR-compliant medical record storage (JSONB in Postgres)
- Document upload with OCR pipeline
- Role-based access (Patient, Doctor, Nurse, Lab Technician, Admin)

---

## 2. Architecture

```mermaid
graph TB
    subgraph "Monorepo Root"
        ROOT["mediphi/"]
    end

    subgraph "Apps"
        DASHBOARD["@mediphi/dashboard<br/>Next.js 15 App Router"]
    end

    subgraph "Shared Packages"
        SHARED["@mediphi/shared<br/>Constants, FHIR types, enums"]
    end

    subgraph "Backend"
        SUPABASE["Supabase<br/>PostgreSQL + Auth + RLS"]
    end

    ROOT --> DASHBOARD
    ROOT --> SHARED
    DASHBOARD --> SHARED
    DASHBOARD --> SUPABASE
```

```mermaid
flowchart LR
    subgraph "Frontend Stack"
        NEXT["Next.js 15.3.3<br/>App Router"]
        REACT["React 19"]
        TS["TypeScript 5"]
        TW["Tailwind CSS v4<br/>@tailwindcss/postcss"]
        FONT["Figtree<br/>next/font/google"]
    end

    subgraph "Backend Stack"
        PG["PostgreSQL 15+"]
        AUTH["Supabase Auth"]
        RLS["Row Level Security"]
        STORAGE["Supabase Storage<br/>Documents / OCR"]
    end

    subgraph "Data Standard"
        FHIR["FHIR R4<br/>JSONB Resources"]
    end

    NEXT --> REACT
    NEXT --> TS
    NEXT --> TW
    NEXT --> FONT
    NEXT --> PG
    NEXT --> AUTH
    PG --> RLS
    PG --> FHIR
    PG --> STORAGE
```

---

## 3. Monorepo Structure

```mermaid
graph TD
    A["mediphi/"] --> B["apps/"]
    A --> C["packages/"]
    A --> D["supabase/"]
    A --> E["turbo.json"]
    A --> F["package.json<br/>npm workspaces"]

    B --> G["dashboard/<br/>@mediphi/dashboard"]

    G --> G1["app/<br/>Next.js App Router"]
    G --> G2["components/<br/>React components"]
    G --> G3["package.json"]

    G1 --> G1a["(auth)/<br/>login, signup"]
    G1 --> G1b["profile/<br/>User profile + vault"]
    G1 --> G1c["medical-records/<br/>Record timeline"]
    G1 --> G1d["page.tsx<br/>Landing page"]
    G1 --> G1e["layout.tsx<br/>Root layout"]
    G1 --> G1f["globals.css<br/>Tailwind v4 theme"]

    G2 --> G2a["forms/<br/>LoginForm, SignupForm"]
    G2 --> G2b["profile/<br/>ProfileInfo, ProfileButtons, Profile"]

    C --> H["shared/<br/>@mediphi/shared"]
    H --> H1["src/constants.ts<br/>FHIR types, IDs, enums"]

    D --> I["migrations/<br/>20260530000000_initial_schema.sql"]
```

---

## 4. Database Schema

```mermaid
erDiagram
    profiles ||--o{ medical_records : "owns"
    profiles ||--o{ documents : "owns"
    profiles ||--o{ record_shares : "grants"
    profiles ||--o{ qr_sessions : "creates"
    profiles ||--o{ pending_submissions : "receives"
    hospitals ||--o{ staff : "employs"
    hospitals ||--o{ record_shares : "receives"
    hospitals ||--o{ qr_sessions : "participates"
    hospitals ||--o{ pending_submissions : "sends"
    staff ||--o{ medical_records : "accesses via RLS"
    documents ||--o{ pending_submissions : "attached to"

    profiles {
        uuid id PK "auth.users.id"
        string mediphi_id UK "MPH-XXXXXX"
        string full_name
        date date_of_birth
        string phone
        string email
        string qr_data
        timestamp created_at
    }

    hospitals {
        uuid id PK
        string name
        string registration_number UK
        enum type "hospital|lab|clinic"
        string address
        string qr_data
        boolean verified
        timestamp created_at
    }

    staff {
        uuid id PK "auth.users.id"
        uuid hospital_id FK
        enum role "doctor|nurse|lab_technician|admin"
        string full_name
        timestamp created_at
    }

    medical_records {
        uuid id PK
        uuid patient_id FK
        string fhir_resource_type
        jsonb fhir_data
        enum source_type "hospital_push|patient_upload"
        uuid source_id
        uuid document_id
        timestamp recorded_at
        timestamp created_at
    }

    documents {
        uuid id PK
        uuid patient_id FK
        string storage_path
        string file_name
        string mime_type
        int file_size
        enum ocr_status "pending|processing|completed|failed"
        jsonb ocr_result
        timestamp created_at
    }

    record_shares {
        uuid id PK
        uuid patient_id FK
        uuid hospital_id FK
        jsonb scope "['Observation', 'Condition']"
        timestamp expires_at
        boolean approved
        timestamp created_at
    }

    qr_sessions {
        uuid id PK
        string token UK
        enum session_type "patient_scan_hospital|hospital_scan_patient"
        uuid patient_id FK
        uuid hospital_id FK
        enum status "pending|completed|expired"
        timestamp expires_at
        timestamp created_at
    }

    pending_submissions {
        uuid id PK
        uuid patient_id FK
        uuid hospital_id FK
        string fhir_resource_type
        jsonb fhir_data
        uuid document_id FK
        enum status "pending|approved|rejected"
        timestamp created_at
    }
```

---

## 5. App Router Structure

```mermaid
graph LR
    subgraph "Route Groups"
        RG1["(auth)"]
    end

    subgraph "Routes"
        R1["/"] --> P1["page.tsx<br/>Landing page"]
        R2["/login"] --> P2["(auth)/login/page.tsx<br/>LoginForm"]
        R3["/signup"] --> P3["(auth)/signup/page.tsx<br/>SignupForm"]
        R4["/profile"] --> P4["profile/page.tsx<br/>Profile + ProfileInfo + ProfileButtons"]
        R5["/medical-records"] --> P5["medical-records/page.tsx<br/>MedicalRecordsPage"]
    end

    subgraph "Layouts"
        L1["layout.tsx<br/>Root layout (Figtree font)"]
        L2["(auth)/layout.tsx<br/>Auth card wrapper"]
        L3["profile/layout.tsx<br/>Profile main wrapper"]
    end

    L1 --> R1
    L1 --> L2
    L2 --> R2
    L2 --> R3
    L1 --> L3
    L3 --> R4
    L1 --> R5
```

---

## 6. Component Hierarchy

```mermaid
graph TD
    subgraph "Landing Page"
        LP["page.tsx"] --> LP1["Header<br/>Logo + Nav links"]
        LP --> LP2["Hero Section<br/>Text + CTA buttons"]
        LP --> LP3["Vault Preview Card<br/>Demo MPH-482916"]
        LP --> LP4["Footer"]
    end

    subgraph "Auth Pages"
        AL["(auth)/layout.tsx"] --> AF["LoginForm.tsx / SignupForm.tsx"]
        AF --> AF1["Email input"]
        AF --> AF2["Password input + Show/Hide toggle"]
        AF --> AF3["Submit button<br/>w-full"]
        AF --> AF4["Error banner"]
    end

    subgraph "Profile Page"
        PP["profile/page.tsx"] --> P["Profile.tsx"]
        P --> P1["ProfileInfo.tsx<br/>User avatar, name, MPH-ID, badges"]
        P --> P2["ProfileButtons.tsx<br/>QR Code + Quick Actions"]
        P1 --> P1a["Lab Results row"]
        P1 --> P1b["Hospitals row"]
        P1 --> P1c["Shared Access row"]
        P2 --> P2a["QR Code card"]
        P2 --> P2b["Quick Actions card<br/>View Records, Upload, Share"]
    end

    subgraph "Medical Records Page"
        MR["medical-records/page.tsx"] --> MR1["Stats cards grid"]
        MR --> MR2["Timeline list"]
    end
```

---

## 7. Data Flow

```mermaid
sequenceDiagram
    actor User as Patient
    participant Dashboard as Next.js Dashboard
    participant Supabase as Supabase Auth + DB
    participant Hospital as Hospital Staff Portal

    User->>Dashboard: Sign up / Log in
    Dashboard->>Supabase: supabase.auth.signUp / signIn
    Supabase-->>Dashboard: JWT session + user metadata
    Dashboard->>Supabase: SELECT * FROM profiles WHERE id = auth.uid()
    Supabase-->>Dashboard: Profile data (name, DOB, MPH-ID)

    User->>Dashboard: Generate QR Code
    Dashboard->>Supabase: Create qr_sessions token
    Supabase-->>Dashboard: QR token + expiry
    Dashboard-->>User: Display QRCodeSVG

    Hospital->>Supabase: Scan QR + SELECT profiles
    Supabase-->>Hospital: Patient identity
    Hospital->>Supabase: INSERT pending_submissions
    Supabase-->>User: (Realtime or refresh) New submission visible

    User->>Dashboard: Approve submission
    Dashboard->>Supabase: UPDATE pending_submissions status
    Supabase-->>Dashboard: Approved
    Dashboard->>Supabase: INSERT medical_records (FHIR JSONB)
    Supabase-->>Dashboard: Record stored

    User->>Dashboard: Share records with hospital
    Dashboard->>Supabase: INSERT record_shares (scope, expiry)
    Supabase-->>Dashboard: Share grant created
    Hospital->>Supabase: SELECT medical_records via RLS<br/>(checks record_shares.approved = true)
    Supabase-->>Hospital: Granted FHIR records only
```

---

## 8. Styling & Tailwind v4 Configuration

### 8.1 Theme Tokens (`globals.css`)

All colors are defined in `@theme inline` — Tailwind v4's CSS-based config. No `tailwind.config.ts`.

```mermaid
graph LR
    subgraph "Color Palette"
        A["warm-bg<br/>#FAF6F0"] --> A1["Page background gradient start"]
        B["warm-bg-alt<br/>#F5EFE6"] --> B1["Page background gradient end"]
        C["surface<br/>#FFFFFF"] --> C1["Card backgrounds"]
        D["text-primary<br/>#2D2A26"] --> D1["Headings, primary text"]
        E["text-secondary<br/>#8B8680"] --> E1["Labels, descriptions"]
        F["accent<br/>#D4875E"] --> F1["CTA buttons, links, badges"]
        G["accent-hover<br/>#C0744A"] --> G1["Button hover states"]
        H["accent-light<br/>#FDF0E8"] --> H1["Icon containers, pill badges"]
        I["sage<br/>#7A9B8A"] --> I1["FHIR indicators, success"]
        J["sage-light<br/>#E8F0EB"] --> J1["FHIR badge backgrounds"]
        K["border<br/>#E8E3DC"] --> K1["Dividers, card borders"]
    end
```

### 8.2 Custom Animation Classes

| Class | Animation |
|-------|-----------|
| `.animate-fade-in` | Fade + slide up (0.6s) |
| `.animate-fade-in-left` | Fade + slide from left |
| `.animate-fade-in-right` | Fade + slide from right |
| `.animate-fade-in-scale` | Fade + scale 0.96→1 |

Usage: Add class + `style={{ opacity: 0 }}` to prevent flash before animation.

### 8.3 CRITICAL: What NOT to do in CSS

These rules were previously added and **broke the entire UI**. Never re-add them:

```css
/* ❌ NEVER — universal margin/padding reset fights Tailwind v4 Preflight */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* ❌ NEVER — wildcard attribute selector overrides Tailwind utilities */
[class*="rounded-3xl"], [class*="rounded-2xl"] { overflow: hidden; }

/* ❌ NEVER — broad element selectors with deprecated word-break */
div, p, span, h1, h2, h3, h4, h5, h6, a, button, label, li, td, th {
  overflow-wrap: break-word;
  word-break: break-word;
}

/* ❌ NEVER — global button truncation without nowrap (breaks ellipsis) */
button, a[class*="bg-accent"], a[class*="bg-sage"] {
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 8.4 CSS Best Practices for this Project

1. **Use Tailwind utilities in JSX, not global CSS selectors.**
2. **Use inline `style={{ opacity: 0 }}`** only for animation initial states.
3. **Use responsive padding classes** (`px-6 md:px-12 lg:px-16`) instead of fixed `style={{ paddingLeft: '4rem' }}`.
4. **Use `whitespace-nowrap` on buttons** that must stay single-line.
5. **Use `min-w-0` on flex children** that should shrink below content width.
6. **Never use `[class*="..."]` wildcard selectors** — they override Tailwind utilities due to equal specificity + later source order.
7. **Let Tailwind v4 Preflight handle resets.** Do not add universal `* { margin: 0; padding: 0 }`.

---

## 9. Shared Constants (`@mediphi/shared`)

```mermaid
graph LR
    subgraph "@mediphi/shared"
        C["src/constants.ts"] --> C1["MEDIPHI_ID_PREFIX = 'MPH'"]
        C --> C2["MEDIPHI_ID_LENGTH = 6"]
        C --> C3["QR_SESSION_EXPIRY_MINUTES = 5"]
        C --> C4["FHIR_RESOURCE_TYPES[]"]
        C --> C5["FHIR_RESOURCE_LABELS{}"]
        C --> C6["HOSPITAL_TYPES[]"]
        C --> C7["STAFF_ROLES[]"]
        C --> C8["DOCUMENT_OCR_STATUSES[]"]
        C --> C9["SUBMISSION_STATUSES[]"]
    end
```

**FHIR Resource Labels mapping:**

| FHIR Type | UI Label |
|-----------|----------|
| `Observation` | **Lab Results** |
| `Condition` | Diagnoses |
| `MedicationStatement` | Medications |
| `Immunization` | Vaccinations |
| `DiagnosticReport` | Reports |
| `Patient` | Patient Info |

---

## 10. Row Level Security (RLS) Rules

```mermaid
graph TD
    subgraph "RLS Policy Model"
        P["Patients<br/>auth.uid() = profiles.id"] --> P1["SELECT/UPDATE/INSERT own profile"]
        P --> P2["SELECT/INSERT/DELETE own medical_records"]
        P --> P3["SELECT/UPDATE own documents"]
        P --> P4["ALL on own record_shares"]
        P --> P5["SELECT/UPDATE own pending_submissions"]
        P --> P6["SELECT/INSERT/UPDATE own qr_sessions"]

        H["Hospital Staff<br/>staff.id = auth.uid()"] --> H1["SELECT own hospital"]
        H --> H2["SELECT granted medical_records<br/>via record_shares.approved = true"]
        H --> H3["SELECT shares targeting their hospital"]
        H --> H4["SELECT/INSERT qr_sessions for their hospital"]
        H --> H5["INSERT/SELECT pending_submissions for their hospital"]

        A["Hospital Admins<br/>staff.role = 'admin'"] --> A1["UPDATE own hospital"]
        A --> A2["ALL on staff in their hospital"]
    end
```

---

## 11. File Reference

| File | Purpose | Notes |
|------|---------|-------|
| `apps/dashboard/app/globals.css` | Tailwind v4 theme + animations | **Keep minimal. No global selectors.** |
| `apps/dashboard/app/layout.tsx` | Root layout | Loads Figtree font via `next/font/google` |
| `apps/dashboard/app/page.tsx` | Landing page | Hero + vault preview card |
| `apps/dashboard/app/(auth)/layout.tsx` | Auth layout | Card wrapper for login/signup |
| `apps/dashboard/app/(auth)/login/page.tsx` | Login page | Wraps `LoginForm` |
| `apps/dashboard/app/(auth)/signup/page.tsx` | Signup page | Wraps `SignupForm` |
| `apps/dashboard/app/profile/page.tsx` | Profile page | Fetches mock user, renders `Profile` |
| `apps/dashboard/app/profile/layout.tsx` | Profile layout | Minimal wrapper |
| `apps/dashboard/app/medical-records/page.tsx` | Records timeline | Placeholder data, stats cards |
| `apps/dashboard/app/components/forms/LoginForm.tsx` | Login form | Client component with loading state |
| `apps/dashboard/app/components/forms/SignupForm.tsx` | Signup form | Client component |
| `apps/dashboard/app/components/profile/Profile.tsx` | Profile orchestrator | Combines `ProfileInfo` + `ProfileButtons` |
| `apps/dashboard/app/components/profile/ProfileInfo.tsx` | User info card | Avatar, name, MPH-ID, badges, vault rows |
| `apps/dashboard/app/components/profile/ProfileButtons.tsx` | QR + actions | `qrcode.react` for QRCodeSVG |
| `packages/shared/src/constants.ts` | Shared constants | FHIR labels, ID prefix, enums |
| `supabase/migrations/20260530000000_initial_schema.sql` | DB schema | All tables, enums, indexes, RLS policies |

---

## 12. Build Commands

```bash
# Dev server (runs via Turborepo)
cd C:\Users\pvmod\Programming\MediPhi\mediphi
npm run dev

# Production build
cd apps/dashboard
npm run build

# Or from root via Turbo
npm run build

# Lint
cd apps/dashboard
npm run lint
```

**Port:** `http://localhost:3000`

---

## 13. Known Issues & Gotchas

1. **Tailwind v4 CSS-only config:** No `tailwind.config.ts`. All theme tokens live in `globals.css` under `@theme inline`.
2. **Preflight is sacred:** Do not add global `*` resets. Preflight already handles `box-sizing` and sensible defaults.
3. **No `[class*="..."]` wildcards:** These override Tailwind utilities silently due to equal specificity + later source order.
4. **Animation opacity:** All animated elements need `style={{ opacity: 0 }}` to prevent flash before CSS animation begins.
5. **Mock user data:** `profile/page.tsx` uses a simulated `getUser()` with hardcoded `Philip Varghese Modayil`.
6. **Medical records page** uses placeholder static data, not yet connected to Supabase.
7. **Auth forms** use simulated 2s delays — not yet connected to Supabase Auth.
8. **QR sessions expire in 5 minutes** (`QR_SESSION_EXPIRY_MINUTES = 5`).

---

## 14. Environment Variables

Create `apps/dashboard/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

*Last updated: 2026-05-30*
