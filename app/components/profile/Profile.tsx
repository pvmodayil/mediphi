// Profile.tsx
'use client';
import React from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileButtons from './ProfileButtons';

type User = {
  id: string;
  name: string;
  age: number;
  sex: string;
  role: string;
}

export default function Profile({ user }: { user: User }) {
  return (
    <div>
      <ProfileInfo user={user} />
      <ProfileButtons user={user} />
    </div>
  );
}