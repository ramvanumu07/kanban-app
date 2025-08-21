// src/store/slices/kanbanSlice.js
import { createSlice, current } from '@reduxjs/toolkit';

/**
 * columns: [{id, title, order}]
 * tasks: {
 *   [columnId]: [{id, title, details, labels, assignees, priority, createdAt, dueDate, ...}]
 * }
 */

const initialState = {
  columns: [
    { id: 'draft', title: 'Draft', order: 0 },
    { id: 'unsolved', title: 'Unsolved', order: 1 },
    { id: 'review', title: 'Under Review', order: 2 },
    { id: 'solved', title: 'Solved', order: 3 },
    { id: 'needs_info', title: 'Needs Info', order: 4 }
  ],
  tasks: {
    draft: [],
    unsolved: [],
    review: [],
    solved: [],
    needs_info: []
  },
  loading: false,
  error: null,
  filter: {},
  sort: null
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addColumn(state, action) {
      state.columns.push(action.payload);
      state.tasks[action.payload.id] = [];

    },
    editColumn(state, action) {
      const { id, data } = action.payload;
      const colIdx = state.columns.findIndex(col => col.id === id);
      if (colIdx > -1) {
        state.columns[colIdx] = { ...state.columns[colIdx], ...data };

      }
    },
    deleteColumn(state, action) {
      const id = action.payload;
      state.columns = state.columns.filter(col => col.id !== id);
      delete state.tasks[id];

    },
    addTask(state, action) {
      const { columnId, task } = action.payload;
      state.tasks[columnId].push(task);

    },
    editTask(state, action) {
      const { taskId, data } = action.payload;
      for (const col in state.tasks) {
        const idx = state.tasks[col].findIndex(t => t.id === taskId);
        if (idx > -1) {
          state.tasks[col][idx] = { ...state.tasks[col][idx], ...data };
          break;
        }
      }

    },
    deleteTask(state, action) {
      const taskId = action.payload;
      for (const col in state.tasks) {
        state.tasks[col] = state.tasks[col].filter(t => t.id !== taskId);
      }

    },
    moveTask(state, action) {
      const { taskId, columnId } = action.payload;
      let task = null;
      for (const col in state.tasks) {
        const idx = state.tasks[col].findIndex(t => t.id === taskId);
        if (idx > -1) {
          task = state.tasks[col][idx];
          state.tasks[col].splice(idx, 1);
          break;
        }
      }
      if (task) {
        state.tasks[columnId].push(task);

      }
    },
    setTasksFilter(state, action) {
      state.filter = action.payload;
    },
    setTasksSort(state, action) {
      state.sort = action.payload;
    },
    setKanbanFromLocalStorage(state, action) {
      Object.assign(state, action.payload);
    }
  }
});

export const {
  addColumn, editColumn, deleteColumn,
  addTask, editTask, deleteTask, moveTask,
  setTasksFilter, setTasksSort,
  setKanbanFromLocalStorage
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
