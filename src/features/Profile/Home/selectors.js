import { createSelector } from 'reselect';

const dataState = state => state.data;

export const getUser = createSelector([dataState], data => data.user);
export const getUserRole = createSelector([dataState], data => data.auth.role);
