import { createSelector } from 'reselect';

const bookingState = state => state.features.booking;

const bookingAngel = createSelector(
  [bookingState],
  booking => booking.bookingAngel
);

export const getAngelData = createSelector([bookingAngel], data => data.angel);
