// src/components/ui/LabelBadge.jsx
import React from 'react';
import styled from 'styled-components';
import { getLabelColor } from '../../constants/labels';

/*
Rendering colored badge for label such as Critical/Disclosure/Status
 */

const Badge = styled.span`
  display: inline-block;
  padding: 0.24em 0.92em;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 11px;
  margin-right: 0.44em;
  margin-bottom: 0.18em;
  color: ${({ textColor }) => textColor || '#fff'};
  background: ${({ bgColor }) => bgColor || '#6d6d6d'};
  transition: filter 0.18s;

  &:hover {
    filter: brightness(0.95);
  }
`;

/**
 * Used for task priorities, types, and status.
 * @param {object} props: label, type (priority/disclosure/status), custom colors
 */
function LabelBadge({ label, type, customColor }) {
  const { bgColor, textColor } = getLabelColor(label, type, customColor);
  return <Badge bgColor={bgColor} textColor={textColor}>{label}</Badge>;
}

export default React.memo(LabelBadge);
