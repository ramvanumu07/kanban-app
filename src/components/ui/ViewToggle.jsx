// src/components/ui/ViewToggle.jsx
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
  gap: 2px;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${props => props.active ? '#1464ff' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#6b7280'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.active ? '#0f56d9' : '#e5e7eb'};
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 16px;
    min-width: 70px;
    height: 40px;
    padding: 10px 18px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    min-width: 80px;
    height: 44px;
    padding: 12px 20px;
  }

  @media (max-width: 414px) {
    font-size: 17px;
    min-width: 75px;
    height: 42px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
    min-width: 70px;
    height: 40px;
  }

  @media (max-width: 320px) {
    font-size: 15px;
    min-width: 65px;
    height: 38px;
  }
`;

function ViewToggle({ activeView, onViewChange }) {
    return (
        <ToggleContainer>
            <ToggleButton
                active={activeView === 'board'}
                onClick={() => onViewChange('board')}
            >
                Board
            </ToggleButton>
            <ToggleButton
                active={activeView === 'list'}
                onClick={() => onViewChange('list')}
            >
                List
            </ToggleButton>
        </ToggleContainer>
    );
}

export default ViewToggle;