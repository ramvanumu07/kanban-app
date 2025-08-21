// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import AuthPage from './pages/AuthPage';
import KanbanPage from './pages/KanbanPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { loadPersistedState } from './utils/persistState';
import { setAuthFromLocalStorage } from './store/slices/authSlice';
import { setKanbanFromLocalStorage } from './store/slices/kanbanSlice';

// Test styled component to ensure styles are working
const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7f9fb !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  color: #203970 !important;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f9fb;
  font-family: 'Inter', sans-serif;
  color: #203970;
  font-size: 16px;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #e5eefc;
  border-top: 3px solid #1464ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('App mounting - styled-components loaded:', !!styled);
    console.log('Theme provider should be wrapping this component');

    // Load auth data first
    const { auth } = loadPersistedState();
    if (auth) {
      dispatch(setAuthFromLocalStorage(auth));

      // If user is authenticated, load their specific kanban data
      if (auth.isAuthenticated && auth.user && auth.user.email) {
        const { kanban } = loadPersistedState(auth.user.email);
        if (kanban) {
          dispatch(setKanbanFromLocalStorage(kanban));
        }
      }
    }

    // Mark as initialized after a small delay to ensure all state is loaded
    setTimeout(() => setIsInitialized(true), 100);
  }, [dispatch]);

  // Auto redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      console.log('User authenticated, redirecting to board...');
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  // Show loading screen until app is initialized
  if (!isInitialized) {
    return (
      <LoadingContainer>
        <LoadingContent>
          <Spinner />
          <span>Loading...</span>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  return (
    <AppContainer className="kanban-board">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <KanbanPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
