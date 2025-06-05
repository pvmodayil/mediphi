import React from 'react';

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string;
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

export default function ProfileInfo({ user }: { user: User }) {
  return (
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
    </div>
  );
}

export async function getServerSideProps() {
    // Simulating fetching user data from a database or API
    const user: User = {
        id: "12345",
        name: "John Doe",
        age: calculateAge("1990-01-01"), // Example DOB
        sex: "Male",
        role: "Patient",
    };

  return {
    props: {
      user,
    },
  };
}