'use client';
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'

const LoginPage: React.FC = () => {
  const handleLogin = (user: { email: string; password: string }) => {
    console.log('User logged in succesfully:', user);
  };

  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
