'use client';
import React from 'react';
import Link from "next/link";
import {QRCodeSVG} from "qrcode.react"

type User = {
  id: string;
  name: string;
  email: string;
  dob: string;} 

export default function Profile() {

  const user: User = {
    id: "12345",  
    name: "John Doe",
    email: "example@mail.com",
    dob: "1990-01-01"
  };
  const qrValue = JSON.stringify({user});    
  
  return (
    <div>
      <div className="bg-amber-200 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fade-in-up">
        <div className="flex flex-row items-center mb-4">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=FBBF24&color=065F46&size=128"
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-emerald-200 shadow-lg mr-6"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold mb-2 text-emerald-700">{user.name}</h1>
            <h2 className="text-xl font-bold text-emerald-700">Description</h2>
            <p className="text-emerald-900">{user.email}</p>
            <p className="text-emerald-900">DOB: {user.dob}</p>
          </div>
        </div>
      </div>
      <div className="py-3" /> {/* Padding between cards */}
      <div className="bg-amber-100 backdrop-blur-lg rounded-3xl shadow-2xl p-20 w-full max-w-md text-center border border-white/20 animate-fade-in-up">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-emerald-700">Scan Me</h1>
          <div className="mb-4">
            <QRCodeSVG value={qrValue} size={256} />
          </div>
        </div>
      </div>
    </div>
  );
}