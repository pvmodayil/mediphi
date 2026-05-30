'use client';
import React from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileButtons from './ProfileButtons';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string;
}

export default function Profile({ user }: { user: User }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 border-b border-ink-lighter/30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-sage/40 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-light">
              <path d="M12 2L12 22M2 12L22 12M7 7L17 17M17 7L7 17" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display text-lg tracking-tight text-cream">MediPhi</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/medical-records" className="text-sm text-stone hover:text-cream font-body transition-colors duration-300">
            Records
          </Link>
          <Link href="/" className="text-sm text-stone hover:text-cream font-body transition-colors duration-300">
            Sign out
          </Link>
        </nav>
      </header>

      <div className="flex-1 px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <p className="text-xs text-stone/60 font-body uppercase tracking-wider mb-2">Profile</p>
            <h1 className="font-display text-3xl text-cream tracking-tight">Your Medical Vault</h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <ProfileInfo user={user} />
            </div>
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <ProfileButtons user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
