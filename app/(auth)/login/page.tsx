'use client';
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'
import { redirect } from 'next/navigation';

const LoginPage: React.FC = () => {
  const handleLogin = (user: { email: string; password: string }) => {
    console.log('User logged in succesfully:', user);
    redirect('./profile'); // Redirect to profile page after successful login
  };

  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
