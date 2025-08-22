// src/components/ui/Toast.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
`;

const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  
  ${props => {
        switch (props.type) {
            case 'success':
                return `
          background: #10b981;
          color: white;
        `;
            case 'error':
                return `
          background: #ef4444;
          color: white;
        `;
            case 'warning':
                return `
          background: #f59e0b;
          color: white;
        `;
            default:
                return `
          background: #3b82f6;
          color: white;
        `;
        }
    }}
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastMessage = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div`
  font-size: 16px;
  flex-shrink: 0;
`;

function Toast({ toasts, onRemove }) {
    if (!toasts || toasts.length === 0) return null;

    return (
        <ToastContainer>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} type={toast.type}>
                    <Icon>
                        {toast.type === 'success' && '✓'}
                        {toast.type === 'error' && '✗'}
                        {toast.type === 'warning' && '⚠'}
                        {toast.type === 'info' && 'ℹ'}
                    </Icon>
                    <ToastMessage>{toast.message}</ToastMessage>
                    <CloseButton onClick={() => onRemove(toast.id)}>
                        ×
                    </CloseButton>
                </ToastItem>
            ))}
        </ToastContainer>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now() + Math.random();
        const toast = { id, message, type };

        setToasts(prev => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const clearAllToasts = () => {
        setToasts([]);
    };

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        showSuccess: (message, duration) => addToast(message, 'success', duration),
        showError: (message, duration) => addToast(message, 'error', duration),
        showWarning: (message, duration) => addToast(message, 'warning', duration),
        showInfo: (message, duration) => addToast(message, 'info', duration)
    };
}

export default Toast;
