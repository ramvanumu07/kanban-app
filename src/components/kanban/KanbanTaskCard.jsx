// src/components/kanban/KanbanTaskCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import StarBadgeComponent from '../ui/StarIcon';

const CardContainer = styled.div`
  background: #fff;
  border-radius: 11px;
  box-shadow: 0 2px 12px rgba(230, 233, 245, 0.8);
  margin-bottom: 12px;
  padding: clamp(12px, 2.5vw, 16px);
  transition: box-shadow 0.18s, transform 0.1s;
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.8vw, 6px);
  cursor: pointer;
  opacity: ${({ isDragging }) => (isDragging ? 0.6 : 1)};
  position: relative;
  width: 100%;
  border: 1px solid #f1f3f5;
  min-height: clamp(100px, 16vh, 120px);
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 20px rgba(230, 233, 245, 0.9);
    transform: translateY(-1px);
  }

  &:hover .checkbox-container {
    opacity: 1;
  }

  &:hover .id-time-group:not(.checked) {
    transform: translateX(24px);
  }

  &.checked .id-time-group {
    transform: translateX(24px);
  }

  &.checked .checkbox-container {
    opacity: 1;
  }

  @media (max-width: 1200px) {
    padding: clamp(10px, 2.2vw, 14px);
    gap: clamp(3px, 0.7vw, 5px);
  }

  @media (max-width: 768px) {
    padding: clamp(8px, 2vw, 12px);
    gap: clamp(3px, 0.6vw, 4px);
  }

  @media (max-width: 480px) {
    padding: clamp(6px, 1.8vw, 10px);
    gap: clamp(2px, 0.5vw, 3px);
  }

  @media (max-width: 320px) {
    padding: clamp(5px, 1.5vw, 8px);
    gap: clamp(2px, 0.4vw, 3px);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: clamp(1px, 0.2vw, 2px);
  position: relative;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  left: -24px;
  top: 0;
  opacity: ${({ isChecked }) => isChecked ? 1 : 0};
  transition: opacity 0.2s ease;
  z-index: 2;
`;

const Checkbox = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #000000;
  border-radius: 3px;
  background: ${props => props.checked ? '#000000' : '#fff'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: #000000;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  ${props => props.checked && `
    &:after {
      content: '✓';
      color: white;
      font-size: 11px;
      font-weight: bold;
      line-height: 1;
    }
  `}
`;

const IdTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.2vw, 8px);
  transition: transform 0.2s ease;
  flex-shrink: 0;
`;

const IssueId = styled.span`
  font-size: clamp(12px, 2vw, 14px);
  color: #697189;
  font-weight: 500;
  white-space: nowrap;
`;

const TimestampContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(3px, 0.6vw, 4px);
`;

const Timestamp = styled.span`
  font-size: clamp(12px, 2vw, 14px);
  color: #697189;
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const DiamondIcon = styled.div`
  width: clamp(16px, 2.8vw, 18px);
  height: clamp(16px, 2.8vw, 18px);
  background: #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  
  &:after {
    content: '';
    width: clamp(6px, 1.2vw, 8px);
    height: clamp(6px, 1.2vw, 8px);
    background: white;
    border-radius: 1px;
    transform: rotate(45deg);
  }

  @media (hover: none) and (pointer: coarse) {
    width: clamp(18px, 3.2vw, 22px);
    height: clamp(18px, 3.2vw, 22px);
    
    &:after {
      width: clamp(7px, 1.4vw, 9px);
      height: clamp(7px, 1.4vw, 9px);
    }
  }
`;

const CardTitle = styled.div`
  font-size: clamp(15px, 2.6vw, 17px);
  font-weight: 600;
  color: #24344a;
  line-height: 1.3;
  margin: clamp(2px, 0.4vw, 3px) 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

const BadgesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: clamp(4px, 0.8vw, 6px);
  flex-wrap: nowrap;
`;

const BadgesGroup = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 6px);
  flex-wrap: nowrap;
  flex-shrink: 0;
`;

const PriorityBadge = styled.span`
  background: ${props => {
    switch (props.priority) {
      case 'Critical': return '#8b1538';
      case 'High': return '#dc2626';
      case 'Medium': return '#f97316';
      case 'Low': return '#eab308';
      default: return '#6b7280';
    }
  }};
  color: white;
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 600;
  padding: clamp(2px, 0.4vw, 3px) clamp(6px, 1.2vw, 8px);
  border-radius: clamp(8px, 1.5vw, 10px);
  text-transform: capitalize;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
`;

const AssigneeBadge = styled.span`
  background: ${props => {
    switch (props.assignee) {
      case 'Hypejab': return '#e9d5ff';
      case 'Gelastra': return '#dcfce7';
      case 'SecurityTeam': return '#fef3c7';
      case 'Source Code': return '#dbeafe';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.assignee) {
      case 'Hypejab': return '#7c3aed';
      case 'Gelastra': return '#16a34a';
      case 'SecurityTeam': return '#d97706';
      case 'Source Code': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 500;
  padding: clamp(2px, 0.4vw, 3px) clamp(4px, 1vw, 6px);
  border-radius: clamp(8px, 1.5vw, 10px);
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  height: auto;
  flex-shrink: 0;
  line-height: 1;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(3px, 0.6vw, 4px);
  flex-shrink: 0;
`;

const CircularRating = styled.div`
  position: relative;
  width: clamp(8px, 1.4vw, 10px);
  height: clamp(8px, 1.4vw, 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transform: translateY(-3px);
`;

const SegmentedCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Segment = styled.div`
  position: absolute;
  width: 1.5px;
  height: clamp(2.5px, 0.5vw, 3px);
  background: ${props => props.filled ? props.color : '#e5e7eb'};
  border-radius: 0.5px;
  transform-origin: 50% clamp(4px, 0.7vw, 5px);
  transform: ${props => `rotate(${props.angle}deg) translateY(-2.5px)`};
  transition: background 0.3s ease;
  top: 50%;
  left: 50%;
  margin-left: -0.75px;
  margin-top: -1.25px;
`;

const RatingText = styled.span`
  font-size: clamp(15px, 2.6vw, 17px);
  font-weight: 500;
  color: #24344a;
  white-space: nowrap;
`;

const BadgeIcon = styled.div`
  width: clamp(16px, 2.8vw, 18px);
  height: clamp(16px, 2.8vw, 18px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  background: transparent;
  border: none;
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
  }

  @media (hover: none) and (pointer: coarse) {
    width: clamp(20px, 3.2vw, 24px);
    height: clamp(20px, 3.2vw, 24px);
  }
`;

const VerificationTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: #1e293b;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 1000;
  pointer-events: none;
  max-width: 200px;
  word-wrap: break-word;
  white-space: normal;
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    right: 12px;
    border: 4px solid transparent;
    border-top-color: #1e293b;
  }
  
  ${BadgeIcon}:hover &.selected {
    opacity: 1;
    visibility: visible;
  }
  
  @media (max-width: 768px) {
    right: -8px;
    max-width: 160px;
    font-size: 11px;
    padding: 6px 10px;
    
    &:after {
      right: 10px;
    }
  }
`;

function KanbanTaskCard({ task, onTaskUpdate, onTaskDelete, onTaskEdit, columnId }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isStarred, setIsStarred] = useState(task.starred || false);

  const [{ isDragging }, drag] = useDrag({
    type: 'KANBAN_TASK',
    item: { id: task.id, columnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Get priority color for rating segments
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#8b1538';
      case 'High': return '#dc2626';
      case 'Medium': return '#f97316';
      case 'Low': return '#eab308';
      default: return '#6b7280';
    }
  };

  // Generate 12 segments for rating circle
  const generateSegments = () => {
    const segments = [];
    const ratingValue = task.rating || 8.8;
    const filledSegments = Math.round((ratingValue / 10) * 12);
    const priorityColor = getPriorityColor(task.priority);

    for (let i = 0; i < 12; i++) {
      segments.push(
        <Segment
          key={i}
          angle={i * 30} // 360 / 12 = 30 degrees
          filled={i < filledSegments}
          color={priorityColor}
        />
      );
    }
    return segments;
  };

  // Handle checkbox toggle
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    const cardElement = e.target.closest('.card-container');
    if (cardElement) {
      if (newChecked) {
        cardElement.classList.add('checked');
      } else {
        cardElement.classList.remove('checked');
      }
    }
  };

  // Handle badge click
  const handleBadgeClick = (e) => {
    e.stopPropagation();
    const newStarred = !isStarred;
    setIsStarred(newStarred);

    if (onTaskUpdate) {
      onTaskUpdate(task.id, { starred: newStarred });
    }
  };

  // Format timestamp
  const formatTimestamp = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }

      const day = date.getDate();
      const month = date.toLocaleDateString('en', { month: 'short' });
      const time = date.toLocaleTimeString('en', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return `${day} ${month}, ${time}`;
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const ratingValue = task.rating || 8.8;

  return (
    <CardContainer
      ref={drag}
      isDragging={isDragging}
      className={`card-container ${isChecked ? 'checked' : ''}`}
    >
      <HeaderRow>
        <CheckboxContainer className="checkbox-container" isChecked={isChecked}>
          <Checkbox
            checked={isChecked}
            onClick={handleCheckboxClick}
          />
        </CheckboxContainer>

        <IdTimeGroup className={`id-time-group ${isChecked ? 'checked' : ''}`}>
          <IssueId>#{task.id ? String(task.id).slice(-4).padStart(4, '0') : '8793'}</IssueId>
          <TimestampContainer>
            <Timestamp>{formatTimestamp(task.createdAt)}</Timestamp>
          </TimestampContainer>
        </IdTimeGroup>

        <IconContainer>
          <DiamondIcon />
        </IconContainer>
      </HeaderRow>

      <CardTitle>{task.title}</CardTitle>

      <BadgesRow>
        <BadgesGroup>
          <PriorityBadge priority={task.priority}>
            {task.priority}
          </PriorityBadge>

          <AssigneeBadge assignee={task.assignee}>
            {task.assignee}
          </AssigneeBadge>

          <RatingContainer>
            <CircularRating>
              <SegmentedCircle>
                {generateSegments()}
              </SegmentedCircle>
            </CircularRating>
            <RatingText>{ratingValue}</RatingText>
          </RatingContainer>
        </BadgesGroup>

        <BadgeIcon>
          <StarBadgeComponent
            isActive={isStarred}
            onClick={handleBadgeClick}
          />
          <VerificationTooltip className={isStarred ? 'selected' : ''}>
            Verified by {task.verifiedBy || 'Sam'}
          </VerificationTooltip>
        </BadgeIcon>
      </BadgesRow>
    </CardContainer>
  );
}

export default KanbanTaskCard;