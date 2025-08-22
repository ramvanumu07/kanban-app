// src/components/ui/LabelFilter.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Filter icon component
const FilterIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-2 1A1 1 0 018 16v-4.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);

const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterButton = styled.button`
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

  @media (max-width: 768px) {
    justify-content: center;
    width: 100% !important;
    padding: 8px 12px;
    font-size: 13px;
    gap: 6px;
    min-height: 32px;
  }
  
  ${props => props.hasSelection && `
    border: 1px solid #3b82f6;
    background: #eff6ff;
    color: #1d4ed8;
  `}
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    min-width: auto;
    width: 100%;
  }
`;

const DropdownHeader = styled.div`
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownTitle = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    color: #374151;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #f3f4f6;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

function LabelFilter({
    selectedLabels = [],
    availableLabels = [],
    onLabelsChange,
    buttonText = "Filter Labels"
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLabelToggle = (labelId) => {
        const newSelectedLabels = selectedLabels.includes(labelId)
            ? selectedLabels.filter(id => id !== labelId)
            : [...selectedLabels, labelId];

        onLabelsChange(newSelectedLabels);
    };

    const handleClearAll = () => {
        onLabelsChange([]);
    };

    const getDisplayText = () => {
        // Always return the static button text, like Sort By button
        return buttonText;
    };

    return (
        <FilterContainer ref={containerRef}>
            <FilterButton
                onClick={handleToggleDropdown}
                hasSelection={selectedLabels.length > 0}
            >
                <FilterIcon />
                {getDisplayText()}
            </FilterButton>

            <Dropdown isOpen={isOpen}>
                <DropdownHeader>
                    <DropdownTitle>Filter by Labels</DropdownTitle>
                    {selectedLabels.length > 0 && (
                        <ClearButton onClick={handleClearAll}>Clear all</ClearButton>
                    )}
                </DropdownHeader>

                {availableLabels.length === 0 ? (
                    <DropdownItem>No labels available</DropdownItem>
                ) : (
                    availableLabels.map(label => (
                        <DropdownItem
                            key={label.id}
                            onClick={() => handleLabelToggle(label.id)}
                        >
                            <Checkbox
                                type="checkbox"
                                checked={selectedLabels.includes(label.id)}
                                onChange={() => { }} // Controlled by onClick
                            />
                            <ColorDot color={label.color} />
                            {label.name}
                        </DropdownItem>
                    ))
                )}
            </Dropdown>
        </FilterContainer>
    );
}

export default LabelFilter;
