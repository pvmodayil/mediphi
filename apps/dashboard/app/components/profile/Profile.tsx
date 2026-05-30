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
    <div className="flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-8 md:px-12 lg:px-20">
        <header className="flex items-center justify-between py-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2v10.892" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4.26 10.147L12 2l7.74 8.147" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-text-primary">MediPhi</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/medical-records" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium">
              Records
            </Link>
            <Link href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium">
              Sign out
            </Link>
          </nav>
        </header>
      </div>

      <div className="max-w-6xl mx-auto w-full px-8 md:px-12 lg:px-20 py-8">
        <div className="mb-8 animate-fade-in" style={{ opacity: 0 }}>
          <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-2">Profile</p>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Your Medical Vault</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <ProfileInfo user={user} />
          </div>
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <ProfileButtons user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
