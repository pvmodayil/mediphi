// page.tsx or index.tsx
import React from 'react';
import Profile from '../components/profile/Profile';

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

// Simulated API call
async function getUser(): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    id: "12345",
    name: "Philip Varghese Modayil",
    age: calculateAge("1990-01-01"),
    sex: "Male",
    role: "Patient",
  };
}

export default async function Page() {
  const user = await getUser();
  return <Profile user={user} />;
}