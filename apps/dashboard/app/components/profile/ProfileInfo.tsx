import React from 'react';
import Link from "next/link";

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string;
}

export default function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-8">
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-sm bg-sage/10 border border-sage/20 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-2xl text-sage-light">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-2xl text-cream tracking-tight mb-1 truncate">{user.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-stone/60 font-body uppercase tracking-wider">MediPhi ID</span>
            <span className="text-sm text-sage-light font-body font-medium">MPH-{user.id}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink/50 border border-ink-lighter/30 rounded-sm text-xs text-stone font-body">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/60">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {user.age} yrs
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink/50 border border-ink-lighter/30 rounded-sm text-xs text-stone font-body">
              {user.sex}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sage/10 border border-sage/20 rounded-sm text-xs text-sage-light font-body">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-ink/50 rounded-sm border border-ink-lighter/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-cream font-body">Lab Results</div>
              <div className="text-xs text-stone/60 font-body">12 records</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between p-4 bg-ink/50 rounded-sm border border-ink-lighter/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-cream font-body">Hospitals</div>
              <div className="text-xs text-stone/60 font-body">3 linked</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between p-4 bg-ink/50 rounded-sm border border-ink-lighter/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-cream font-body">Shared Access</div>
              <div className="text-xs text-stone/60 font-body">2 active grants</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {user.role !== "Doctor" && (
        <div className="mt-6 pt-6 border-t border-ink-lighter/30">
          <Link href="/doctor-verification" className="text-sm text-sage-light hover:text-cream font-body transition-colors duration-300">
            Are you a healthcare provider?
          </Link>
        </div>
      )}
    </div>
  );
}
