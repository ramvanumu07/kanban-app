// src/components/ui/DropdownFilterButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  z-index: 10002;
  
  @media (max-width: 768px) {
    z-index: 10003;
  }
`;

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
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${props => props.fixedWidth ? props.fixedWidth : 'auto'};
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
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

  &:after {
    content: ${props => props.hideArrow ? '""' : '"▼"'};
    font-size: 10px;
    color: #6b7280;
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100% !important;
    padding: 8px 12px;
    font-size: 13px;
    gap: 6px;
    min-height: 32px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  width: max-content;
  max-width: 300px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10001;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? 0 : -8}px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  
  @media (max-width: 768px) {
    z-index: 10002;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9fafb;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }

  ${props => props.selected && `
    background: #eff6ff;
    color: #1e40af;
    font-weight: 600;
    
    &:after {
      content: '✓';
      color: #1e40af;
      font-weight: bold;
    }
  `}
`;

function DropdownFilterButton({
  icon,
  label,
  options = [],
  value,
  onChange,
  dashed = false,
  showLabel = true,
  hideArrow = false,
  fixedWidth = null,
  buttonText = null // New prop to override the button display text
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // Use buttonText if provided, otherwise use label
  const displayText = buttonText || label;

  return (
    <DropdownContainer ref={dropdownRef}>
      <ButtonContainer
        dashed={dashed}
        hideArrow={hideArrow}
        fixedWidth={fixedWidth}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        {showLabel && displayText}
      </ButtonContainer>

      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            selected={option.value === value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}

export default DropdownFilterButton;