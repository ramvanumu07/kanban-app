// src/pages/KanbanPage.jsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BoardHeader from '../components/kanban/BoardHeader';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import TaskEditModal from '../components/kanban/TaskEditModal';
import AddTaskModal from '../components/kanban/AddTaskModal';
import AddColumnModal from '../components/kanban/AddColumnModal';
import Loader from '../components/common/Loader';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  min-height: 100vh;
  background: #f7f9fb;
  padding: 2.1em 0;
  overflow-x: auto;
`;

const ColumnsBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2em 1.8em 3em 1.8em;
  min-height: 480px;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1em;
    gap: 1em;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2em;
  padding: 0 1.8em 1em 1.8em;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8em;
    padding: 0 1em 1em 1em;
  }
`;

const WelcomeText = styled.span`
  color: #304267;
  font-size: 1em;

  @media (max-width: 480px) {
    font-size: 0.9em;
    text-align: center;
  }
`;

const LogoutBtn = styled.button`
  background: #e5eefc;
  border-radius: 7px;
  padding: 0.4em 1em;
  border: none;
  font-weight: 600;
  color: #1464ff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d1e4fc;
  }

  @media (max-width: 480px) {
    padding: 0.5em 1.2em;
  }
`;

function KanbanPage() {
  const { user, logoutUser } = useAuthentication();
  const {
    columns, tasks, addNewTask, addNewColumn, updateTask, removeTask,
    updateColumn, removeColumn, moveTaskToColumn, updateFilters, filters, loading, error
  } = useTaskManagement();
  const { handleTaskDragEnd } = useDragAndDrop();
  const [viewType, setViewType] = useState('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  // Handle search with immediate state update and filter dispatch
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  // Filter/sort options
  const sortOptions = [
    { value: '', label: 'Sort By' },
    { value: 'date', label: 'Date' },
    { value: 'priority', label: 'Priority' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'Critical', label: 'Critical' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  const labelOptions = [
    { value: '', label: 'All Labels' },
    { value: 'Disclosure', label: 'Disclosure' },
    { value: 'Bug', label: 'Bug' },
    { value: 'Security', label: 'Security' }
  ];

  // Handler functions
  const handleAddColumn = () => {
    setIsAddColumnModalOpen(true);
  };

  const handleAddTask = (columnId) => {
    setSelectedColumnId(columnId);
    setIsAddTaskModalOpen(true);
  };

  const handleTaskEdit = (taskId) => {
    const task = Object.values(tasks).flat().find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditModalOpen(true);
    }
  };

  const handleTaskDelete = (taskId) => {
    // Delete task without confirmation
    removeTask(taskId);
  };

  const handleLogout = () => {
    // Logout without confirmation
    logoutUser();
  };

  const handleCreateTask = (columnId, taskData) => {
    addNewTask(columnId, taskData);
  };

  const handleCreateColumn = (columnData) => {
    addNewColumn(columnData);
  };

  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleRefresh = () => {
    updateFilters({ search: '', label: '', priority: '', sort: '' });
    setSearchTerm('');
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  // Display columns sorted by order
  const displayedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <BoardWrapper
      className="kanban-board"
      style={{
        minHeight: '100vh',
        background: '#f7f9fb',
        padding: '0'
      }}
    >
      <BoardHeader
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        sortOptions={sortOptions}
        sortValue={filters.sort || ''}
        onSortChange={(value) => updateFilters({ sort: value })}
        viewType={viewType}
        onViewChange={setViewType}
        user={user}
        onLogout={handleLogout}
      />

      <DndProvider backend={HTML5Backend}>
        <ColumnsBar
          className="kanban-columns"
          style={{
            display: 'flex',
            gap: '1.5em',
            padding: '1.5em',
            overflowX: 'auto',
            minHeight: '70vh'
          }}
        >
          {displayedColumns.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks[col.id] || []}
              onAddTask={handleAddTask}
              onTaskDrop={handleTaskDragEnd}
              onTaskEdit={handleTaskEdit}
              onTaskDelete={handleTaskDelete}
              onTaskUpdate={updateTask}
              onColumnEdit={updateColumn}
              onColumnDelete={removeColumn}
            />
          ))}
          <AddColumnButton onClick={handleAddColumn} />
        </ColumnsBar>
      </DndProvider>

      {/* Task Edit Modal */}
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false);
          setSelectedColumnId(null);
        }}
        onSubmit={handleCreateTask}
        columnId={selectedColumnId}
      />

      {/* Add Column Modal */}
      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        onSubmit={handleCreateColumn}
      />
    </BoardWrapper>
  );
}

export default KanbanPage;
