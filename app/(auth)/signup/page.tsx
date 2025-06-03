'use client';
import React from 'react'
import SignupForm from '../../components/forms/SignupForm'

const SignUpPage: React.FC = () => {
  const handleSignup = (user: { email: string; password: string }) => {
    console.log('User signed up successfully:', user);
  };
  
  return (
    <div className='signup-page'>
      <SignupForm onSignup={handleSignup} />
      </div>
  )
}

export default SignUpPage