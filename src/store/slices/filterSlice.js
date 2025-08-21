// src/store/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  label: '',
  priority: '',
  assignee: '',
  status: '',
  sort: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter(state, action) {
      Object.assign(state, action.payload);
    },
    resetFilter(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { updateFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
