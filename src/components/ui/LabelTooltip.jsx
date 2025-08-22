// src/components/ui/LabelTooltip.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 150px;
  margin-bottom: 8px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const TooltipHeader = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid #f3f4f6;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LabelsList = styled.div`
  padding: 4px;
  max-height: 150px;
  overflow-y: auto;
`;

const LabelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font-size: 13px;
  color: #374151;
  border-radius: 4px;
  
  &:hover {
    background: #f9fafb;
  }
`;

const LabelDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
  flex-shrink: 0;
`;

const Arrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
`;

function LabelTooltip({ labels = [], children, isOpen, onToggle }) {
    const tooltipRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                onToggle(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen, onToggle]);

    const handleChildClick = (e) => {
        e.stopPropagation();
        onToggle(!isOpen);
    };

    return (
        <TooltipContainer ref={tooltipRef}>
            <div onClick={handleChildClick}>
                {children}
            </div>

            <TooltipContent isOpen={isOpen}>
                <TooltipHeader>
                    {labels.length === 1 ? '1 Label' : `${labels.length} Labels`}
                </TooltipHeader>
                <LabelsList>
                    {labels.length === 0 ? (
                        <LabelItem>No labels assigned</LabelItem>
                    ) : (
                        labels.map(label => (
                            <LabelItem key={label.id}>
                                <LabelDot color={label.color} />
                                {label.name}
                            </LabelItem>
                        ))
                    )}
                </LabelsList>
                <Arrow />
            </TooltipContent>
        </TooltipContainer>
    );
}

export default LabelTooltip;
