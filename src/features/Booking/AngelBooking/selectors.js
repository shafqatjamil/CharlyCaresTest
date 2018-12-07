import { createSelector } from 'reselect';

const bookingsState = state => state.features.booking.data;
const id = (_, props) => {
  return props.match.params.bookingId;
};

export const getBookingById = createSelector(
  [bookingsState, id],
  (data, id) => {
    if (data.bookings) {
      return data.bookings.find(b => b.id === Number(id));
    }
    return null;
  }
);
