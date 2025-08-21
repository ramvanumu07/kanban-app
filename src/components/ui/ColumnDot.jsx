// src/components/ui/ColumnDot.jsx
import React from 'react';
import styled from 'styled-components';

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ccc'};
  margin-right: 8px;
  margin-top: 6px;
  flex-shrink: 0;
  align-self: flex-start;
`;

const getColumnColor = (columnTitle) => {
    const colors = {
        'Draft': '#777777',
        'Unsolved': '#3b82f6',
        'Under Review': '#f59e0b',
        'Solved': '#10b981',
        'Needs Info': '#ef4444',
    };

    return colors[columnTitle] || '#777777';
};

function ColumnDot({ columnTitle }) {
    return <Dot color={getColumnColor(columnTitle)} />;
}

export default ColumnDot;