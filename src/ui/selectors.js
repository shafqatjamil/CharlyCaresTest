import { createSelector } from 'reselect';

const ui = state => state.ui;

export const getLoadingStatus = createSelector([ui], data => data.isLoading);
export const getErrors = createSelector([ui], data => data.errors);
