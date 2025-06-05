'use client';
import React from 'react';
import ProfileInfo from '/ProfileInfo';
import ProfileButtons from './ProfileButtons';

export default function Profile({ user }) {
  return (
    <div>
      <ProfileInfo user={user} />
      <ProfileButtons user={user} />
    </div>
  );
}