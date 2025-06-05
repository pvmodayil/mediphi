'use client';
import React from 'react';
import Link from "next/link";
import {QRCodeSVG} from "qrcode.react"

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string} 

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

export default function Profile() {
  const user: User = {
    id: "12345",  
    name: "John Doe",
    age: calculateAge("1990-01-01"), // Example DOB
    sex: "Male",
    role: "Patient",
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
            <h3 className="text-xl text-emerald-700">ID: {user.id}</h3>
            <h3 className="text-xl text-emerald-700">Age: {user.age}, Sex: {user.sex}</h3>        
          </div>
        </div>
        {user.role !== "Doctor" && (
          <div className="flex justify-end">
            <button className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-2">
              <Link href="/doctor-verification">Are you a Doctor?</Link>
            </button>
          </div>
        )}
      </div>
      <div className="py-3" /> {/* Increased padding between cards */}
      <div className="bg-amber-100 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-xs mx-auto text-center border border-white/20 animate-fade-in-up">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-2 text-emerald-700">Scan Me</h1>
          <div className="mb-4 flex justify-center">
            <QRCodeSVG value={qrValue} size={256} />
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-2">
            <Link href="/medical-records">View Medical Records</Link>
          </button>
        </div>
      </div>
    </div>
  );
}