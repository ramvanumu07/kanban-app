// src/store/middleware/persistenceMiddleware.js

import { persistState } from '../../utils/persistState';

/**
 * Redux middleware that automatically persists kanban data with user-specific keys
 * This ensures each user's data is stored separately and securely
 */
export const persistenceMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    // Actions that should trigger kanban data persistence
    const kanbanActions = [
        'kanban/addColumn',
        'kanban/editColumn',
        'kanban/deleteColumn',
        'kanban/addTask',
        'kanban/editTask',
        'kanban/deleteTask',
        'kanban/moveTask',
        'kanban/setKanbanFromLocalStorage'
    ];

    if (kanbanActions.includes(action.type)) {
        const state = store.getState();
        const user = state.auth.user;
        const userId = user ? user.email : null;

        // Persist kanban data with user-specific key
        if (userId) {
            persistState('kanban', state.kanban, userId);
        }
    }

    return result;
};