import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  margin-top: 4px;
  overflow: hidden;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.danger ? '#dc2626' : '#374151'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? '#fef2f2' : '#f9fafb'};
  }
  
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
  
  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  `}
`;

const MenuIcon = styled.span`
  font-size: 16px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuText = styled.span`
  font-weight: 500;
`;

const MenuDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 4px 0;
`;

function CategoryOptionsMenu({
    isOpen,
    onClose,
    onDeleteCategory,
    taskCount,
    children
}) {
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    const handleMenuItemClick = (action) => {
        action();
        onClose();
    };

    return (
        <MenuContainer ref={menuRef}>
            {children}

            <DropdownMenu isOpen={isOpen}>
                <MenuItem
                    danger
                    onClick={() => handleMenuItemClick(onDeleteCategory)}
                >
                    <MenuIcon>❌</MenuIcon>
                    <div>
                        <MenuText>Delete Category</MenuText>
                        <MenuDescription>
                            {taskCount > 0
                                ? `Remove category and ${taskCount} task${taskCount === 1 ? '' : 's'}`
                                : 'Remove empty category'
                            }
                        </MenuDescription>
                    </div>
                </MenuItem>
            </DropdownMenu>
        </MenuContainer>
    );
}

export default CategoryOptionsMenu;
