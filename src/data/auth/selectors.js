import { createSelector } from 'reselect';

const getAuthState = state => state.data.auth;

export const getToken = createSelector(getAuthState, auth => auth.token);
export const getAuthStatus = createSelector(
  getAuthState,
  auth => auth.isAuthenticated
);
export const getUserRole = createSelector(getAuthState, auth => auth.role);
