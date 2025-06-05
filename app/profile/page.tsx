import React from 'react';
import Profile from '../components/Profile';
import ProfileInfo from './ProfileInfo';

export default function Page({ user }) {
  return <Profile user={user} />;
}

export async function getServerSideProps() {
  return await ProfileInfo.getServerSideProps();
}