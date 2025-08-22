// src/hooks/useAuthentication.js
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, signup, logoutUser, clearAuthError, setValidationError } from '../store/slices/authSlice';

/**
 * Manages authentication workflow.
 * @returns auth state, login, logout, signup methods, errors, loading
 */
export function useAuthentication() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(state => state.auth);

  const loginUser = (payload) => {
    console.log('Hook: loginUser called with', payload);
    dispatch(login(payload));
  };

  const signupUser = (payload) => {
    console.log('Hook: signupUser called with', payload);
    dispatch(signup(payload));
  };

  const logoutUserAction = () => {
    console.log('Hook: logoutUser called');
    dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  const setValidationError = (errorMessage) => {
    dispatch(setValidationError(errorMessage));
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    loginUser,
    signupUser,
    logoutUser: logoutUserAction,
    clearError,
    setValidationError
  };
}
