// ProfileInfo.tsx
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
    <div className="bg-amber-100 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fade-in-up">
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
        <div className="flex justify-end mt-4">
          <Link href="/doctor-verification">
            <p className="text-blue-600 hover:underline cursor-pointer">
              Are you a Doctor?
            </p>
          </Link>
        </div>
      )}
      <div className="py-1"/>
    </div>
  );
}