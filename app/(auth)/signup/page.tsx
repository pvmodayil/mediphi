'use client';
import React from 'react'
import SignupForm from '../../components/forms/SignupForm'
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = (user: { email: string; password: string }) => {
    
    console.log('User signed up successfully:', user);
    router.push('./login'); // Redirect to login page after successful signup
  };
  
  return (
    <div className='signup-page'>
      <SignupForm onSignup={handleSignup} />
      </div>
  )
}

export default SignUpPage