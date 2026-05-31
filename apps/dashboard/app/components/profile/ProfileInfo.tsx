import React from 'react';
import Link from "next/link";

interface ProfileData {
  id: string;
  mediphi_id: string;
  full_name: string;
  date_of_birth: string | null;
  sex: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function ProfileInfo({ profile }: { profile: ProfileData }) {
  const initials = profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const age = profile.date_of_birth ? calculateAge(profile.date_of_birth) : null;

  return (
    <div className="bg-surface rounded-3xl shadow-lg p-8 overflow-hidden">
      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-accent">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-text-primary tracking-tight mb-1">{profile.full_name}</h2>
          <div className="text-sm text-accent font-semibold mb-3">{profile.mediphi_id}</div>
          <div className="flex flex-wrap gap-2">
            {age !== null && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warm-bg rounded-xl text-sm font-medium text-text-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {age} yrs
              </span>
            )}
            {profile.sex && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warm-bg rounded-xl text-sm font-medium text-text-primary">
                {profile.sex.charAt(0).toUpperCase() + profile.sex.slice(1)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light rounded-xl text-sm font-semibold text-accent">
              Patient
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">Lab Results</div>
              <div className="text-xs text-text-secondary">12 records</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between p-4 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">Hospitals</div>
              <div className="text-xs text-text-secondary">3 linked</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between p-4 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">Shared Access</div>
              <div className="text-xs text-text-secondary">2 active grants</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <Link href="/doctor-verification" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
          Are you a healthcare provider?
        </Link>
      </div>
    </div>
  );
}
