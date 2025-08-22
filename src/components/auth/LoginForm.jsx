// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import AuthCard from './AuthCard';
import { validateUserEmail } from '../../utils/validateUserEmail';

function LoginForm({ onSubmit, loading, error, onValidationError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!validateUserEmail(email)) {
      onValidationError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      onValidationError('Password must be at least 6 characters');
      return;
    }

    onSubmit({ email, password });
  }

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
          mb="1.1em"
          className="auth-input"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          mb="1.4em"
          className="auth-input"
        />
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="auth-button"
          style={{ width: '100%', marginTop: '0.6em' }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        {error && (
          <div style={{ color: '#e21e45', fontSize: '0.89em', marginTop: '1em', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </form>
    </AuthCard>
  );
}

export default LoginForm;
