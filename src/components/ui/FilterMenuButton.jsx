// src/components/ui/FilterMenuButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FilterIcon } from './icons.jsx';

const MenuContainer = styled.div`
  position: relative;
  z-index: 100;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 32px;
  white-space: nowrap;
  justify-content: center;
  width: 120px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
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

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    gap: 6px;
    min-height: 32px;
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? 0 : -8}px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;

const FilterItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;

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

function FilterMenuButton({ selectedFilter = null, onFilterChange = () => { } }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = [
    { label: 'Assigned To', value: 'assignedTo' },
    { label: 'Severity', value: 'severity' },
    { label: 'Status', value: 'status' },
    { label: 'Pentest', value: 'pentest' },
    { label: 'Target', value: 'target' }
  ];

  const currentFilterLabel = selectedFilter
    ? filterOptions.find(option => option.value === selectedFilter)?.label || 'Others'
    : 'Others';

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <FilterIcon />
        {currentFilterLabel}
      </MenuButton>

      <FilterMenu isOpen={isOpen}>
        {filterOptions.map((option) => (
          <FilterItem
            key={option.value}
            onClick={() => {
              onFilterChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </FilterItem>
        ))}
      </FilterMenu>
    </MenuContainer>
  );
}

export default FilterMenuButton;
