'use client';
import React from 'react';
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string;
}

export default function ProfileButtons({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-8">
        <div className="mb-6">
          <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Your QR Code</span>
          <p className="text-sm text-stone font-body mt-1">Show this at any hospital to link your records</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-cream p-4 rounded-sm">
            <QRCodeSVG 
              value={JSON.stringify({ mediphi_id: `MPH-${user.id}`, name: user.name })} 
              size={180}
              bgColor="#F7F5F0"
              fgColor="#0C1116"
            />
          </div>
        </div>

        <div className="text-center">
          <div className="font-display text-xl text-cream tracking-tight mb-1">MPH-{user.id}</div>
          <div className="text-xs text-stone/60 font-body">Scan to access records</div>
        </div>
      </div>

      <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-6">
        <div className="mb-4">
          <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Quick Actions</span>
        </div>

        <div className="space-y-3">
          <Link
            href="/medical-records"
            className="group flex items-center justify-between w-full p-4 bg-ink/50 hover:bg-ink border border-ink-lighter/30 hover:border-sage/30 rounded-sm transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                  <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-cream font-body">View Medical Records</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <button className="group flex items-center justify-between w-full p-4 bg-ink/50 hover:bg-ink border border-ink-lighter/30 hover:border-sage/30 rounded-sm transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-cream font-body">Upload Document</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="group flex items-center justify-between w-full p-4 bg-ink/50 hover:bg-ink border border-ink-lighter/30 hover:border-sage/30 rounded-sm transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                  <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-cream font-body">Share Records</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
