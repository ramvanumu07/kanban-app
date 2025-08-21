// src/components/kanban/KanbanColumn.jsx
import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import KanbanTaskCard from './KanbanTaskCard';
import AddTaskButton from './AddTaskButton';
import ColumnDot from '../ui/ColumnDot';
import { DotsIcon, PlusIcon } from '../ui/icons.jsx';

const ColumnContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.3em 1.1em 1.4em 1.1em;
  margin: 0 0.5em;
  min-width: 360px;
  max-width: 380px;
  box-shadow: 0 2px 12px rgba(232, 234, 243, 0.6);
  display: flex;
  flex-direction: column;
  gap: 1.1em;
  transition: box-shadow 0.2s, border-color 0.2s;
  border: 2px solid transparent;

  &[data-drop-over="true"] {
    border-color: rgba(20, 100, 255, 0.4);
    box-shadow: 0 4px 28px rgba(50, 113, 241, 0.1);
    background: #f8fbff;
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
  align-items: flex-start;
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
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  
  &:hover {
    color: #333;
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

function KanbanColumn({
  column,
  tasks = [],
  onAddTask,
  onTaskDrop,
  onTaskEdit,
  onTaskDelete,
  onTaskUpdate,
  onColumnEdit,
  onColumnDelete
}) {
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
          <ActionButton
            title="More options"
            onClick={() => {
              // Simple column management without prompts
              if (tasks.length > 0) {
                // Cannot delete column with tasks - do nothing
                return;
              } else {
                // Delete empty column without confirmation
                onColumnDelete?.(column.id);
              }
            }}
          >
            <DotsIcon />
          </ActionButton>
          <ActionButton title="Add task" onClick={() => onAddTask?.(column.id)}>
            <PlusIcon />
          </ActionButton>
        </HeaderRight>
      </ColumnHeader>

      <AddTaskButton onClick={() => onAddTask?.(column.id)} />

      <TasksContainer>
        {tasks.map((task) => (
          <KanbanTaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
            onTaskUpdate={onTaskUpdate}
          />
        ))}
      </TasksContainer>
    </ColumnContainer>
  );
}

export default React.memo(KanbanColumn);
