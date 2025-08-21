// src/hooks/useDragAndDrop.js
import { useCallback } from 'react';
import { useTaskManagement } from './useTaskManagement';

/**
 * Manages DnD logic between Kanban columns
 * Returns { handleTaskDragEnd }
 */
export function useDragAndDrop() {
  const { moveTaskToColumn } = useTaskManagement();

  /**
   * Called when a task drag ends (drops on new column)
   */
  const handleTaskDragEnd = useCallback((taskId, targetColumnId) => {
    moveTaskToColumn(taskId, targetColumnId);
  }, [moveTaskToColumn]);

  return { handleTaskDragEnd };
}
