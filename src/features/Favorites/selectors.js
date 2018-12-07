import { createSelector } from 'reselect';

const favoritesState = state => state.features.favorites;

export const getFavorites = createSelector(
  [favoritesState],
  state => state.favorites
);
export const getActiveBabysitting = createSelector(
  [favoritesState],
  state => state.activeBabysitting
);
