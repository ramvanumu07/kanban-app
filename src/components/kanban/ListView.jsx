// src/components/kanban/ListView.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import KanbanTaskCard from './KanbanTaskCard';
import CategoryOptionsMenu from '../ui/CategoryOptionsMenu';
import ColumnDot from '../ui/ColumnDot';
import AddColumnButton from './AddColumnButton';
import { DotsIcon, PlusIcon } from '../ui/icons.jsx';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px 24px 3em 24px;
  min-height: 70vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategorySection = styled.div`
  background: transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &[data-drop-over="true"] {
    background: rgba(128, 128, 128, 0.1);
    border: 2px dashed #000000;
    border-radius: 8px;
  }
`;

const CategoryHeader = styled.div`
  padding: 0 0 16px 0;
  background: transparent;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 32px;
  margin-bottom: 16px;
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

const CategoryTitle = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
  margin: 0;
  padding: 0;
`;

const TaskCount = styled.span`
  color: #697189;
  font-size: 0.9em;
  font-weight: 400;
  margin-left: 0.5em;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
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

const TasksContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 60px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #64748b;
  font-size: 14px;
`;

function ListView({
    columns,
    tasks,
    onAddTask,
    onAddColumn,
    onTaskDrop,
    onTaskEdit,
    onTaskDelete,
    onTaskUpdate,
    onColumnEdit,
    onColumnDelete,
    availableLabels
}) {
    const [showOptionsMenuFor, setShowOptionsMenuFor] = useState(null);

    const handleOptionsMenuClick = (columnId) => {
        setShowOptionsMenuFor(showOptionsMenuFor === columnId ? null : columnId);
    };

    const handleDeleteCategory = (columnId) => {
        onColumnDelete(columnId);
        setShowOptionsMenuFor(null);
    };
    return (
        <ListContainer>
            {columns.map((column) => {
                const columnTasks = tasks[column.id] || [];
                const isOptionsMenuOpen = showOptionsMenuFor === column.id;

                return (
                    <ListCategoryItem
                        key={column.id}
                        column={column}
                        tasks={columnTasks}
                        isOptionsMenuOpen={isOptionsMenuOpen}
                        onAddTask={onAddTask}
                        onTaskDrop={onTaskDrop}
                        onTaskEdit={onTaskEdit}
                        onTaskDelete={onTaskDelete}
                        onTaskUpdate={onTaskUpdate}
                        onOptionsMenuClick={handleOptionsMenuClick}
                        onDeleteCategory={handleDeleteCategory}
                        onCloseOptionsMenu={() => setShowOptionsMenuFor(null)}
                        availableLabels={availableLabels}
                    />
                );
            })}
            <AddColumnButton onClick={onAddColumn} />
        </ListContainer>
    );
}

// Individual category component with drop functionality
function ListCategoryItem({
    column,
    tasks,
    isOptionsMenuOpen,
    onAddTask,
    onTaskDrop,
    onTaskEdit,
    onTaskDelete,
    onTaskUpdate,
    onOptionsMenuClick,
    onDeleteCategory,
    onCloseOptionsMenu,
    availableLabels
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
        <CategorySection
            ref={dropRef}
            data-drop-over={isOver}
        >
            <CategoryHeader>
                <HeaderLeft>
                    <ColumnDot columnTitle={column.title} />
                    <CategoryTitle>
                        {column.title}
                        <TaskCount>{tasks.length}</TaskCount>
                    </CategoryTitle>
                </HeaderLeft>
                <HeaderRight>
                    <CategoryOptionsMenu
                        isOpen={isOptionsMenuOpen}
                        onClose={onCloseOptionsMenu}
                        onDeleteCategory={() => onDeleteCategory(column.id)}
                        taskCount={tasks.length}
                    >
                        <ActionButton
                            title="Category options"
                            onClick={() => onOptionsMenuClick(column.id)}
                        >
                            <DotsIcon />
                        </ActionButton>
                    </CategoryOptionsMenu>
                    <ActionButton title="Add task" onClick={() => onAddTask(column.id)}>
                        <PlusIcon />
                    </ActionButton>
                </HeaderRight>
            </CategoryHeader>

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
        </CategorySection>
    );
}

export default React.memo(ListView);
