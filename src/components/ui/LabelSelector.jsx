// src/components/ui/LabelSelector.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 36px;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  align-items: center;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const LabelTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: ${props => props.color || '#e5e7eb'};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const Placeholder = styled.span`
  color: #9ca3af;
  font-size: 14px;
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
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
  display: ${props => props.isOpen ? 'block' : 'none'};
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

  ${props => props.selected && `
    background: #eff6ff;
    color: #1d4ed8;
  `}
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

function LabelSelector({
    selectedLabels = [],
    availableLabels = [],
    onLabelsChange,
    placeholder = "Select labels..."
}) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
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

    const handleRemoveLabel = (labelId, e) => {
        e.stopPropagation();
        const newSelectedLabels = selectedLabels.filter(id => id !== labelId);
        onLabelsChange(newSelectedLabels);
    };

    const getSelectedLabelObjects = () => {
        return selectedLabels
            .map(labelId => availableLabels.find(label => label.id === labelId))
            .filter(Boolean);
    };

    return (
        <SelectorContainer ref={selectorRef}>
            <SelectedLabels onClick={handleToggleDropdown} tabIndex={0}>
                {selectedLabels.length > 0 ? (
                    getSelectedLabelObjects().map(label => (
                        <LabelTag key={label.id} color={label.color}>
                            {label.name}
                            <RemoveButton
                                onClick={(e) => handleRemoveLabel(label.id, e)}
                                title="Remove label"
                            >
                                ×
                            </RemoveButton>
                        </LabelTag>
                    ))
                ) : (
                    <Placeholder>{placeholder}</Placeholder>
                )}
            </SelectedLabels>

            <Dropdown isOpen={isOpen}>
                {availableLabels.length === 0 ? (
                    <DropdownItem>No labels available</DropdownItem>
                ) : (
                    availableLabels.map(label => (
                        <DropdownItem
                            key={label.id}
                            selected={selectedLabels.includes(label.id)}
                            onClick={() => handleLabelToggle(label.id)}
                        >
                            <ColorDot color={label.color} />
                            {label.name}
                            {selectedLabels.includes(label.id) && ' ✓'}
                        </DropdownItem>
                    ))
                )}
            </Dropdown>
        </SelectorContainer>
    );
}

export default LabelSelector;
