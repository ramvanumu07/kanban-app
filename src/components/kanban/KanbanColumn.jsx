// src/components/kanban/KanbanColumn.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import KanbanTaskCard from './KanbanTaskCard';
import CategoryOptionsMenu from '../ui/CategoryOptionsMenu';

import ColumnDot from '../ui/ColumnDot';
import { DotsIcon, PlusIcon } from '../ui/icons.jsx';

const ColumnContainer = styled.div`
  background: transparent;
  padding: 0.8em 1.3em 1.6em 0.8em;
  margin: 0;
  min-width: 360px;
  max-width: 380px;
  width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1em;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  border-radius: 8px;

  &[data-drop-over="true"] {
    background: rgba(128, 128, 128, 0.1);
    border: 2px dashed #000000;
    padding: calc(0.8em - 2px) calc(1.3em - 2px) calc(1.6em - 2px) calc(0.8em - 2px);
  }

  @media (max-width: 768px) {
    min-width: 340px;
    margin: 0;
    padding: 1em 0.9em;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.6em;
  padding: 0;
  min-height: 32px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  width: 24px;
  height: 24px;
  
  &:hover {
    color: #333;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ColumnTitle = styled.div`
  display: flex;
  align-items: baseline;
  font-size: clamp(16px, 3.2vw, 20px);
  font-weight: 600;
  color: #1a202c;
  line-height: 1.2;
  margin: 0;
  padding: 0;
`;

const ColumnCount = styled.span`
  color: #697189;
  font-size: 0.9em;
  font-weight: 400;
  margin-left: 0.5em;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  min-height: 120px;
  max-height: 60vh;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f3f7;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c9d2;
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 24px;
  color: #64748b;
  font-size: 14px;
`;

function KanbanColumn({
  column,
  tasks = [],
  onAddTask,
  onTaskDrop,
  onTaskEdit,
  onTaskDelete,
  onTaskUpdate,
  onColumnEdit,
  onColumnDelete,
  availableLabels = []
}) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  // DnD drop target for tasks
  const [{ isOver }, dropRef] = useDrop({
    accept: 'KANBAN_TASK',
    drop: (draggedTask) => {
      if (draggedTask.columnId !== column.id) {
        onTaskDrop?.(draggedTask.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDeleteCategory = () => {
    if (onColumnDelete) {
      onColumnDelete(column.id);
    }
  };

  const handleOptionsMenuClick = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  return (
    <ColumnContainer
      ref={dropRef}
      data-drop-over={isOver ? 'true' : undefined}
      className="kanban-column"
    >
      <ColumnHeader className="column-header">
        <HeaderLeft>
          <ColumnDot columnTitle={column.title} />
          <ColumnTitle className="column-title">
            {column.title}
            <ColumnCount className="column-count">{tasks.length}</ColumnCount>
          </ColumnTitle>
        </HeaderLeft>
        <HeaderRight>
          <CategoryOptionsMenu
            isOpen={showOptionsMenu}
            onClose={() => setShowOptionsMenu(false)}
            onDeleteCategory={handleDeleteCategory}
            taskCount={tasks.length}
          >
            <ActionButton
              title="Category options"
              onClick={handleOptionsMenuClick}
            >
              <DotsIcon />
            </ActionButton>
          </CategoryOptionsMenu>
          <ActionButton title="Add task" onClick={() => onAddTask?.(column.id)}>
            <PlusIcon />
          </ActionButton>
        </HeaderRight>
      </ColumnHeader>

      <TasksContainer>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              onTaskEdit={onTaskEdit}
              onTaskDelete={onTaskDelete}
              onTaskUpdate={onTaskUpdate}
              availableLabels={availableLabels}
            />
          ))
        ) : (
          <EmptyState>
            No tasks in this category yet
          </EmptyState>
        )}
      </TasksContainer>
    </ColumnContainer>
  );
}

export default React.memo(KanbanColumn);
