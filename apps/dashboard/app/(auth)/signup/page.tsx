'use client';
import React from 'react'
import SignupForm from '../../components/forms/SignupForm'
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/login');
  };

  return (
    <div className='signup-page'>
      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default SignUpPage;
