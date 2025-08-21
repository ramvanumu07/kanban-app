// src/components/common/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid #e3e7ee;
  border-top: 4px solid #1464ff;
  border-radius: 50%;
  width: ${({ size }) => size || '34px'};
  height: ${({ size }) => size || '34px'};
  animation: ${spin} 0.8s linear infinite;
  margin: 0 auto;
`;

function Loader({ size = '34px', style = {}, ...props }) {
  return (
    <div style={{ padding: '2em 0', ...style }}>
      <Spinner size={size} />
    </div>
  );
}

export default React.memo(Loader);
