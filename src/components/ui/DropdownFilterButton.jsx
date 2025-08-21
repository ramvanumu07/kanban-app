// src/components/ui/DropdownFilterButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  z-index: 1;
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

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
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
    content: '▼';
    font-size: 10px;
    color: #6b7280;
    margin-left: 4px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 150px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? 0 : -8}px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;

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
`;

function DropdownFilterButton({
    icon,
    label,
    options = [],
    value,
    onChange,
    dashed = false,
    showLabel = true
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

    return (
        <DropdownContainer ref={dropdownRef}>
            <ButtonContainer
                dashed={dashed}
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon}
                {showLabel && label}
            </ButtonContainer>

            <DropdownMenu isOpen={isOpen}>
                {options.map((option) => (
                    <DropdownItem
                        key={option.value}
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