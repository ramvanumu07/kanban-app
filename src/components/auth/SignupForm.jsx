// src/components/auth/SignupForm.jsx
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import AuthCard from './AuthCard';
import { validateUserEmail } from '../../utils/validateUserEmail';

function SignupForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError('');
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPwError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    if (!validateUserEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (password.length < 6) {
      setPwError('Password must be at least 6 characters.');
      valid = false;
    }
    if (!valid) return;
    onSubmit({ email, password });
  }

  return (
    <AuthCard title="Sign Up">
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
        {emailError && (
          <div style={{ color: '#e21e45', fontSize: '0.85em', marginBottom: '0.65em' }}>
            {emailError}
          </div>
        )}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          mb="1.4em"
          className="auth-input"
        />
        {pwError && (
          <div style={{ color: '#e21e45', fontSize: '0.85em', marginBottom: '0.65em' }}>
            {pwError}
          </div>
        )}
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="auth-button"
          style={{ width: '100%', marginTop: '0.6em' }}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
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

export default SignupForm;
