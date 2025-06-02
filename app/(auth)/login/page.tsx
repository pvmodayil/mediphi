'use client';
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'

const LoginPage: React.FC = () => {
  const handleLogin = (user: { email: string; password: string }) => {
    console.log('User logged in:', user);
    // Here you can handle the login logic, such as sending the user data to an API
    // For example, you might call an API to authenticate the user
  };

  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
