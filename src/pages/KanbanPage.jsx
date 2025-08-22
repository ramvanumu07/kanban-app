// src/pages/KanbanPage.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BoardHeader from '../components/kanban/BoardHeader';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import TaskEditModal from '../components/kanban/TaskEditModal';
import AddTaskModal from '../components/kanban/AddTaskModal';
import AddColumnModal from '../components/kanban/AddColumnModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';


import LabelManager from '../components/kanban/LabelManager';
import Toast, { useToast } from '../components/ui/Toast';
import Loader from '../components/common/Loader';
import ListView from '../components/kanban/ListView';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  overflow-x: auto;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 24px;
  max-width: 100%;
`;

const ColumnsBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0 3em 0;
  min-height: 480px;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1em 0;
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
    updateColumn, removeColumn, moveTaskToColumn, removeColumnWithTasks,
    labels, addNewLabel, updateLabel, removeLabel,
    updateFilters, filters, loading, error, rawTasks
  } = useTaskManagement();
  const { handleTaskDragEnd } = useDragAndDrop();
  const [viewType, setViewType] = useState('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });


  const [isLabelManagerOpen, setIsLabelManagerOpen] = useState(false);
  const [selectedLabelFilters, setSelectedLabelFilters] = useState([]);
  const { toasts, showSuccess, showError, showWarning, removeToast } = useToast();

  // Handle search with immediate state update and filter dispatch
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters({ search: value });
  }, [updateFilters]);

  // Filter/sort options
  const sortOptions = useMemo(() => [
    { value: '', label: 'Sort By' },
    { value: 'date', label: 'Date (Newest)' },
    { value: 'date-asc', label: 'Date (Oldest)' },
    { value: 'priority', label: 'Priority (High to Low)' },
    { value: 'priority-asc', label: 'Priority (Low to High)' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'rating-asc', label: 'Rating (Low to High)' }
  ], []);

  const priorityOptions = useMemo(() => [
    { value: '', label: 'All Priorities' },
    { value: 'Critical', label: 'Critical' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ], []);

  // Handler functions
  const handleAddColumn = useCallback(() => {
    setIsAddColumnModalOpen(true);
  }, []);

  const handleAddTask = useCallback((columnId) => {
    setSelectedColumnId(columnId);
    setIsAddTaskModalOpen(true);
  }, []);

  const handleTaskEdit = useCallback((taskId) => {
    const task = Object.values(tasks).flat().find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditModalOpen(true);
    }
  }, [tasks]);

  const handleTaskDelete = useCallback((taskId) => {
    const task = Object.values(tasks).flat().find(t => t.id === taskId);
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task?.title || 'this task'}"? This action cannot be undone.`,
      onConfirm: () => {
        try {
          removeTask(taskId);
          showSuccess('Task deleted successfully!');
        } catch (error) {
          showError('Failed to delete task. Please try again.');
        }
      }
    });
  }, [tasks, removeTask, showSuccess, showError]);

  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const handleCreateTask = useCallback((columnId, taskData) => {
    try {
      addNewTask(columnId, taskData);
      showSuccess('Task created successfully!');
    } catch (error) {
      showError('Failed to create task. Please try again.');
    }
  }, [addNewTask, showSuccess, showError]);

  const handleCreateColumn = useCallback((columnData) => {
    try {
      addNewColumn(columnData);
      showSuccess('Column created successfully!');
    } catch (error) {
      showError('Failed to create column. Please try again.');
    }
  }, [addNewColumn, showSuccess, showError]);

  const handleSaveTask = useCallback((updatedTask) => {
    try {
      updateTask(updatedTask.id, updatedTask);
      setIsEditModalOpen(false);
      setEditingTask(null);
      showSuccess('Task updated successfully!');
    } catch (error) {
      showError('Failed to update task. Please try again.');
    }
  }, [updateTask, showSuccess, showError]);

  const handleRefresh = useCallback(() => {
    updateFilters({ search: '', label: '', priority: '', sort: '' });
    setSearchTerm('');
  }, [updateFilters]);

  const handleColumnDelete = useCallback((columnId) => {
    const column = columns.find(col => col.id === columnId);
    const columnTasks = rawTasks[columnId] || [];
    const taskCount = columnTasks.length;

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Category',
      message: taskCount > 0
        ? `Are you sure you want to delete "${column?.title || 'this category'}" and all ${taskCount} task${taskCount === 1 ? '' : 's'}? This action cannot be undone.`
        : `Are you sure you want to delete "${column?.title || 'this category'}"? This action cannot be undone.`,
      onConfirm: () => {
        try {
          removeColumnWithTasks(columnId);
          showSuccess(taskCount > 0
            ? `Category and ${taskCount} task${taskCount === 1 ? '' : 's'} deleted successfully!`
            : 'Category deleted successfully!'
          );
        } catch (error) {
          showError('Failed to delete category. Please try again.');
        }
      }
    });
  }, [columns, rawTasks, removeColumnWithTasks, showSuccess, showError]);



  const handleLabelFilterChange = useCallback((selectedLabels) => {
    setSelectedLabelFilters(selectedLabels);
    updateFilters({ label: selectedLabels.length > 0 ? selectedLabels : '' });
  }, [updateFilters]);



  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  // Display columns sorted by order - memoized for performance
  const displayedColumns = useMemo(() => {
    return [...columns].sort((a, b) => a.order - b.order);
  }, [columns]);

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
        onManageLabels={() => setIsLabelManagerOpen(true)}
        onLabelFilterChange={handleLabelFilterChange}
        selectedLabels={selectedLabelFilters}
        availableLabels={labels}
        loading={loading}
      />

      <DndProvider backend={HTML5Backend}>
        {viewType === 'board' ? (
          <ColumnsBar
            className="kanban-columns"
            style={{
              display: 'flex',
              gap: '1.5em',
              padding: '16px 24px 3em 24px',
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
                onColumnDelete={handleColumnDelete}
                availableLabels={labels}
              />
            ))}
            <AddColumnButton onClick={handleAddColumn} />
          </ColumnsBar>
        ) : (
          <ListView
            columns={displayedColumns}
            tasks={tasks}
            onAddTask={handleAddTask}
            onAddColumn={handleAddColumn}
            onTaskDrop={handleTaskDragEnd}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
            onTaskUpdate={updateTask}
            onColumnEdit={updateColumn}
            onColumnDelete={handleColumnDelete}
            availableLabels={labels}
          />
        )}
      </DndProvider>

      {/* Task Edit Modal */}
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
        availableLabels={labels}
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
        availableLabels={labels}
      />

      {/* Add Column Modal */}
      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        onSubmit={handleCreateColumn}
        existingColumns={columns}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />





      {/* Label Manager */}
      <LabelManager
        isOpen={isLabelManagerOpen}
        onClose={() => setIsLabelManagerOpen(false)}
        labels={labels}
        onAddLabel={addNewLabel}
        onEditLabel={updateLabel}
        onDeleteLabel={removeLabel}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </BoardWrapper>
  );
}

export default KanbanPage;
