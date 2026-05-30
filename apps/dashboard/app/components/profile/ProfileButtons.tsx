// ProfileButtons.tsx
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
    <div>
      <div className="py-3" /> {/* Increased padding between cards */}
      <div className="bg-amber-100 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-xs mx-auto text-center border border-white/20 animate-fade-in-up">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-2 text-emerald-700">Scan Me</h1>
          <div className="mb-4 flex justify-center">
            <QRCodeSVG value={JSON.stringify({ user })} size={256} />
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-2">
            <Link href="/medical-records">View Medical Records</Link>
          </button>
          
        </div>
      </div>
    </div>
  );
}