// src/components/kanban/AddColumnButton.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const AddColumnContainer = styled.div`
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  margin: 0;
  flex-shrink: 0;
  
  @media (max-width: 1366px) {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }
  
  @media (max-width: 1024px) {
    width: 240px;
    min-width: 240px;
    max-width: 240px;
  }
  
  @media (max-width: 768px) {
    width: 220px;
    min-width: 220px;
    max-width: 220px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  min-height: 120px;
  width: 100%;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  color: #64748b;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  &:active:after {
    width: 200px;
    height: 200px;
  }
  
  @media (max-width: 768px) {
    min-height: 100px;
    padding: 16px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    min-height: 90px;
    padding: 14px;
    font-size: 14px;
  }
`;

const PlusIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #cbd5e1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  ${AddButton}:hover & {
    background: #3b82f6;
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-top: 4px;
  text-align: center;
  
  ${AddButton}:hover & {
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

function AddColumnButton({ onClick, disabled }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <AddColumnContainer>
      <AddButton
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PlusIcon>+</PlusIcon>
            <ButtonText>Add Category</ButtonText>
          </div>
          <Subtitle>Create a new task category</Subtitle>
        </div>
      </AddButton>
    </AddColumnContainer>
  );
}

export default React.memo(AddColumnButton);