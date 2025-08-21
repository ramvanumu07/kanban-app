// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
