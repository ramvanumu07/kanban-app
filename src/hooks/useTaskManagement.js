// src/hooks/useTaskManagement.js
import { useDispatch, useSelector } from 'react-redux';
import {
  addColumn,
  editColumn,
  deleteColumn,
  addTask,
  editTask,
  deleteTask,
  moveTask,
  setTasksFilter,
  setTasksSort,
  moveTasksToColumn,
  deleteColumnWithTasks,
  addLabel,
  editLabel,
  deleteLabel,
  addLabelToTask,
  removeLabelFromTask
} from '../store/slices/kanbanSlice';
import { updateFilter } from '../store/slices/filterSlice';
import { useMemo } from 'react';
import { filterTasksByLabel } from '../utils/filterTasksByLabel';

/**
 * Encapsulates all Kanban column & task logic with filtering and sorting.
 */
export function useTaskManagement() {
  const dispatch = useDispatch();
  const kanban = useSelector((state) => state.kanban);
  const filters = useSelector((state) => state.filter);

  // Memoized filtered and sorted tasks per column
  const processedTasks = useMemo(() => {
    const result = {};

    Object.keys(kanban.tasks).forEach(columnId => {
      let columnTasks = [...kanban.tasks[columnId]];

      // Apply search filter
      if (filters.search) {
        columnTasks = columnTasks.filter(task =>
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.details.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply label filter - support both single and multiple labels
      if (filters.label) {
        if (Array.isArray(filters.label)) {
          // Multiple labels - OR logic (task must have at least one of the selected labels)
          columnTasks = columnTasks.filter(task =>
            task.labels && filters.label.some(labelId => task.labels.includes(labelId))
          );
        } else {
          // Single label
          columnTasks = filterTasksByLabel(columnTasks, filters.label);
        }
      }

      // Apply priority filter
      if (filters.priority) {
        columnTasks = columnTasks.filter(task => task.priority === filters.priority);
      }



      // Apply sorting
      if (filters.sort === 'date') {
        columnTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filters.sort === 'date-asc') {
        columnTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filters.sort === 'priority') {
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        columnTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      } else if (filters.sort === 'priority-asc') {
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        columnTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      } else if (filters.sort === 'title') {
        columnTasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filters.sort === 'title-desc') {
        columnTasks.sort((a, b) => b.title.localeCompare(a.title));
      } else if (filters.sort === 'rating') {
        columnTasks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (filters.sort === 'rating-asc') {
        columnTasks.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      }

      result[columnId] = columnTasks;
    });

    return result;
  }, [kanban.tasks, filters]);

  const addNewColumn = (columnData) => {
    const newColumn = {
      id: `column_${Date.now()}`,
      title: columnData.title,
      order: kanban.columns.length,
      ...columnData
    };
    dispatch(addColumn(newColumn));
  };

  const updateColumn = (id, data) => dispatch(editColumn({ id, data }));
  const removeColumn = (id) => dispatch(deleteColumn(id));

  const addNewTask = (columnId, taskData) => {
    const newTask = {
      id: Math.floor(1000 + Math.random() * 9000),
      title: taskData.title || 'New Task',
      details: taskData.details || '',
      labels: taskData.labels || [],
      priority: taskData.priority || 'Medium',
      rating: taskData.rating || 8.8,
      starred: taskData.starred || false,
      status: taskData.status || '',
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate || '',
      priorityColor: getPriorityColor(taskData.priority || 'Medium'),
      ...taskData
    };
    dispatch(addTask({ columnId, task: newTask }));
  };

  const updateTask = (taskId, data) => dispatch(editTask({ taskId, data }));
  const removeTask = (taskId) => dispatch(deleteTask(taskId));
  const moveTaskToColumn = (taskId, columnId) => dispatch(moveTask({ taskId, columnId }));
  const moveAllTasksToColumn = (fromColumnId, toColumnId) => dispatch(moveTasksToColumn({ fromColumnId, toColumnId }));
  const removeColumnWithTasks = (columnId) => dispatch(deleteColumnWithTasks(columnId));

  // Label management functions
  const addNewLabel = (labelData) => dispatch(addLabel(labelData));
  const updateLabel = (labelId, labelData) => dispatch(editLabel({ id: labelId, data: labelData }));
  const removeLabel = (labelId) => dispatch(deleteLabel(labelId));
  const addTaskLabel = (taskId, labelId) => dispatch(addLabelToTask({ taskId, labelId }));
  const removeTaskLabel = (taskId, labelId) => dispatch(removeLabelFromTask({ taskId, labelId }));

  const updateFilters = (filterUpdates) => dispatch(updateFilter(filterUpdates));
  const setSort = (sort) => updateFilters({ sort });

  return {
    columns: kanban.columns,
    tasks: processedTasks, // Return filtered/sorted tasks
    rawTasks: kanban.tasks, // Raw tasks for internal operations
    labels: kanban.labels, // Available labels
    addNewColumn,
    updateColumn,
    removeColumn,
    addNewTask,
    updateTask,
    removeTask,
    moveTaskToColumn,
    moveAllTasksToColumn,
    removeColumnWithTasks,
    addNewLabel,
    updateLabel,
    removeLabel,
    addTaskLabel,
    removeTaskLabel,
    updateFilters,
    setSort,
    loading: kanban.loading,
    error: kanban.error,
    filters
  };
}

function getPriorityColor(priority) {
  const colors = {
    'Critical': '#8b1538',
    'High': '#dc2626',
    'Medium': '#f97316',
    'Low': '#eab308'
  };
  return colors[priority] || '#f97316';
}
