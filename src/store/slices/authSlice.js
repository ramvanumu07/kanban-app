// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistState, clearUserData } from '../../utils/persistState';

// Mock authentication - simulate API call
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (email && password.length >= 6) {
        return { email, id: Date.now() };
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (email && password.length >= 6) {
        return { email, id: Date.now() };
      } else {
        return rejectWithValue('Invalid details');
      }
    } catch (error) {
      return rejectWithValue('Signup failed');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Clear user-specific data before logging out
      if (state.user && state.user.email) {
        clearUserData(state.user.email);
      }
      Object.assign(state, initialState);
      persistState('auth', initialState);
    },
    setAuthFromLocalStorage(state, action) {
      Object.assign(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        persistState('auth', state);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        persistState('auth', state);
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { logout, setAuthFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
