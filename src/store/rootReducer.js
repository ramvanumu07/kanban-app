// src/store/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import kanbanReducer from './slices/kanbanSlice';
import filterReducer from './slices/filterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  kanban: kanbanReducer,
  filter: filterReducer
});

export default rootReducer;
