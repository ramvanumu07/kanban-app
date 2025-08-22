// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useSelector } from 'react-redux';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import Loader from '../components/common/Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 65%, #dcecff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  box-sizing: border-box;
`;

const SwitchBar = styled.div`
  margin: 0 auto 1.5em auto;
  text-align: center;
  font-size: 1.05em;
  color: #204285;
  
  @media (max-width: 480px) {
    font-size: 0.95em;
    margin-bottom: 1em;
  }
`;

const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #1563FF;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.3em;
  
  &:hover {
    color: #114eee;
  }
`;

function AuthPage() {
  const { loginUser, signupUser, loading, error, isAuthenticated, clearError, setValidationError } = useAuthentication();
  const [isSignup, setIsSignup] = useState(false);

  // Debug: Check if authentication succeeds
  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, loading, error });
  }, [isAuthenticated, loading, error]);

  const handleLogin = (credentials) => {
    console.log('Attempting login with:', credentials);
    loginUser(credentials);
  };

  const handleSignup = (credentials) => {
    console.log('Attempting signup with:', credentials);
    signupUser(credentials);
  };

  const handleSwitchToLogin = () => {
    console.log('Switching to login');
    clearError(); // Clear any existing errors
    setIsSignup(false);
  };

  const handleSwitchToSignup = () => {
    console.log('Switching to signup');
    clearError(); // Clear any existing errors
    setIsSignup(true);
  };

  if (loading) {
    return (
      <Wrapper>
        <Loader />
        <p style={{ marginTop: '1em', color: '#304267' }}>
          {isSignup ? 'Creating account...' : 'Signing in...'}
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="auth-page">
      <SwitchBar className="auth-switch">
        {isSignup
          ? (
            <>Already have an account?
              <LinkBtn className="auth-link" onClick={handleSwitchToLogin}>Log In</LinkBtn>
            </>
          )
          : (
            <>New user?
              <LinkBtn className="auth-link" onClick={handleSwitchToSignup}>Sign Up</LinkBtn>
            </>
          )
        }
      </SwitchBar>

      {isSignup
        ? <SignupForm onSubmit={handleSignup} loading={loading} error={error} onValidationError={setValidationError} />
        : <LoginForm onSubmit={handleLogin} loading={loading} error={error} onValidationError={setValidationError} />
      }


    </Wrapper>
  );
}

export default AuthPage;
