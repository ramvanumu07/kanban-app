// src/components/ui/Dropdown.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: ${({ width }) => width || 'auto'};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.44em 1em;
  font-size: 0.98rem;
  border: 1.5px solid #e4e7ef;
  border-radius: 5px;
  background: #fcfcfe;
  color: #222;
  cursor: pointer;
  appearance: none;

  &:focus {
    border-color: #1464ff;
    outline: none;
    background: #f6faff;
  }
`;

const Chevron = styled.span`
  position: absolute;
  right: 1em;
  top: 50%;
  pointer-events: none;
  color: #b1bacb;
  font-size: 1.05em;
  transform: translateY(-55%);
`;

/**
 * Simple dropdown, renders options from array.
 * @param {object} props: options [{value, label}], value, onChange, width
 */
function Dropdown({ options = [], value, onChange, width = 'auto', ...rest }) {
  return (
    <Container width={width}>
      <StyledSelect value={value} onChange={onChange} {...rest}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </StyledSelect>
      <Chevron>▼</Chevron>
    </Container>
  );
}

export default React.memo(Dropdown);
