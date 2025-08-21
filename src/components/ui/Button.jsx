// src/components/ui/Button.jsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${({ variant, theme }) => theme.button[variant].bg};
  color: ${({ variant, theme }) => theme.button[variant].color};
  border: none;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s;
  box-shadow: ${({ active }) => (active ? '0 2px 8px #2e3c4d09' : 'none')};

  &:hover, &:focus-visible {
    background: ${({ variant, theme }) => theme.button[variant].hoverBg};
    outline: none;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

StyledButton.defaultProps = {
  theme: {
    button: {
      primary: { bg: '#1464ff', color: '#fff', hoverBg: '#114eee' },
      secondary: { bg: '#f5f6fa', color: '#24293e', hoverBg: '#e6e8f1' },
      danger: { bg: '#ff6363', color: '#fff', hoverBg: '#ed4343' },
      ghost: { bg: 'transparent', color: '#363f56', hoverBg: '#e9eef6' }
    }
  }
};

/**
 * General purpose button, supports variants & props.
 * @param {object} props: variant, disabled, active, type, children, ...rest
 */
function Button({
  children,
  variant = 'primary',
  disabled = false,
  active = false,
  ...rest
}) {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      active={active ? 1 : undefined}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default React.memo(Button);
