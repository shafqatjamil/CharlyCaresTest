import { createSelector } from 'reselect';

const profileState = state => state.features.profile;

export const getPreferences = createSelector(
  [profileState],
  profile => profile.preferences
);
