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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-emerald-700">User Details</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-emerald-700">Scan Me</h2>
      </div>
      <div className="mb-4">
        <QRCodeSVG value={qrValue} size={256} />
      </div>
    </div>
  );
}