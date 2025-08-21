// src/components/ui/Input.jsx
import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.65em ${({ hasIcon }) => hasIcon ? '2.5em' : '1em'} 0.65em 1em;
  font-size: 1rem;
  border: 1.5px solid #e4e7ef;
  border-radius: 5px;
  background: #fcfcfe;
  color: #222;
  margin-bottom: ${({ mb }) => mb || '0'};
  transition: border-color 0.16s;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #1464ff;
    background: #f6faff;
  }

  &:disabled {
    background: #eceff5;
    color: #888;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #b1bacb;
    font-size: 0.95em;
  }

  @media (max-width: 480px) {
    padding: 0.7em ${({ hasIcon }) => hasIcon ? '2.5em' : '0.9em'} 0.7em 0.9em;
    font-size: 16px; /* Prevents iOS zoom */
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b1bacb;
  pointer-events: none;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

function Input({ icon, ...props }) {
  if (icon) {
    return (
      <InputContainer>
        <StyledInput hasIcon={true} {...props} />
        <IconWrapper>{icon}</IconWrapper>
      </InputContainer>
    );
  }

  return <StyledInput hasIcon={false} {...props} />;
}

export default React.memo(Input);
