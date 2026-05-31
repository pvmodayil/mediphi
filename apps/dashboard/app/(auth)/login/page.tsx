'use client';
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/profile');
  };

  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
