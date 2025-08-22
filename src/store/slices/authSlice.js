// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistState, clearUserData, loadPersistedState } from '../../utils/persistState';
import { resetKanbanState, setKanbanFromLocalStorage } from './kanbanSlice';

// Helper function to get registered users from localStorage
const getRegisteredUsers = () => {
  try {
    const users = localStorage.getItem('kanban_registered_users');
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
};

// Helper function to save registered users to localStorage
const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem('kanban_registered_users', JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to save registered users:', e);
  }
};

// Mock authentication - simulate API call
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch, getState }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get registered users
      const registeredUsers = getRegisteredUsers();

      // Find user by email
      const user = registeredUsers.find(u => u.email === email);

      if (!user) {
        return rejectWithValue('User not registered. Please sign up first.');
      }

      if (user.password !== password) {
        return rejectWithValue('Invalid password');
      }

      // Check if switching users and clear previous data if needed
      const currentState = getState();
      if (currentState.auth.user && currentState.auth.user.email !== email) {
        clearUserData(currentState.auth.user.email);
        dispatch(resetKanbanState());
      }

      // Load user's kanban data
      const { kanban } = loadPersistedState(email);
      if (kanban) {
        dispatch(setKanbanFromLocalStorage(kanban));
      } else {
        // If no saved data, reset to initial state
        dispatch(resetKanbanState());
      }

      // Return user data without password
      return { email: user.email, id: user.id };
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

      // Validation
      if (!email || !email.includes('@')) {
        return rejectWithValue('Please enter a valid email address');
      }

      if (!password || password.length < 6) {
        return rejectWithValue('Password must be at least 6 characters long');
      }

      // Get existing registered users
      const registeredUsers = getRegisteredUsers();

      // Check if user already exists
      const existingUser = registeredUsers.find(u => u.email === email);
      if (existingUser) {
        return rejectWithValue('User already registered. Please login instead.');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        email,
        password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
      };

      // Add to registered users
      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);

      // Return user data without password
      return { email: newUser.email, id: newUser.id };
    } catch (error) {
      return rejectWithValue('Signup failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, dispatch }) => {
    const { auth } = getState();

    // Don't clear user data on logout - preserve it for when they log back in
    // Only reset the in-memory kanban state
    dispatch(resetKanbanState());

    return null;
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
    },
    clearAuthError(state) {
      state.error = null;
    },
    setValidationError(state, action) {
      state.error = action.payload;
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
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
        persistState('auth', initialState);
      });
  }
});

export const { logout, setAuthFromLocalStorage, clearAuthError, setValidationError } = authSlice.actions;
export default authSlice.reducer;
