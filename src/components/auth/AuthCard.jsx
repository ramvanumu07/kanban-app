// src/components/auth/AuthCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 320px;
  background: #fff;
  border-radius: 13px;
  box-shadow: 0 7px 28px rgba(10, 24, 92, 0.05);
  padding: 2.2em 2em;
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 90vw;
    min-width: 280px;
    padding: 1.8em 1.5em;
    margin: 0 0.5em;
  }

  @media (max-width: 480px) {
    max-width: 95vw;
    min-width: 260px;
    padding: 1.5em 1.2em;
    border-radius: 10px;
    margin: 0 0.3em;
  }
`;

const Title = styled.h2`
  margin: 0 0 1em 0;
  font-size: 1.6em;
  font-weight: 700;
  color: #13305b;
  letter-spacing: -1px;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.4em;
    margin-bottom: 0.8em;
  }

  @media (max-width: 480px) {
    font-size: 1.3em;
    margin-bottom: 0.7em;
  }
`;

function AuthCard({ title, children }) {
  return (
    <Card className="auth-card">
      <Title className="auth-title">{title}</Title>
      {children}
    </Card>
  );
}

export default AuthCard;
