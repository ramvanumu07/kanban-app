// src/components/ui/FilterButton.jsx
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: ${props => props.dashed ? '1px dashed #d1d5db' : '1px solid #d1d5db'};
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 32px;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

function FilterButton({
  icon,
  label,
  selected = false,
  onClick,
  dashed = false,
  showLabel = true
}) {
  return (
    <ButtonContainer
      dashed={dashed}
      onClick={onClick}
    >
      {icon}
      {showLabel && label}
    </ButtonContainer>
  );
}

export default FilterButton;