// src/hooks/useAuthentication.js
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, signup } from '../store/slices/authSlice';

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
  
  const logoutUser = () => {
    console.log('Hook: logoutUser called');
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    loginUser,
    signupUser,
    logoutUser
  };
}
