import { generateCommonSaga, isAngel } from 'Utils';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  onGetBookingsError,
  onGetBookingsSuccess,
  GET_BOOKINGS_PENDING,
  ANGELS_SEARCH_PENDING,
  onAngelsSearchSuccess,
  onAngelsSearchError,
  GET_ANGELS_FOR_BOOKING_PENDING,
  onGetAngelsForBookingSuccess,
  onGetAngelsForBookingError,
  onAddAngelsToBookingError,
  ADD_ANGELS_TO_BOOKING_PENDING,
  DECLINE_BOOKING_PENDING,
  onDeclineBookingError,
  ANGEL_BOOKING_ACCEPT_PENDING,
  onDeclineBookingSuccess,
  ANGEL_BOOKING_DECLINE_PENDING,
  onAngelAcceptBookingError,
  onAngelAcceptBookingSuccess,
  onAngelDeclineBookingSuccess,
  onAngelDeclineBookingError,
} from './actions';

import API from './api';
function* getBookings(action) {
  try {
    let bookings;
    if (isAngel(action.role)) {
      bookings = yield call(API.getAngleSupportFAQs);
      yield put(onGetBookingsSuccess(bookings.data.data));
    } else {
      bookings = yield call(API.getFamilySupportFAQs);
      yield put(onGetBookingsSuccess(bookings.data.data));
    }
  } catch (e) {
    yield put(onGetBookingsError(e));
  }
}

const onAngelsSearch = generateCommonSaga(
  API.searchAngels,
  onAngelsSearchSuccess,
  onAngelsSearchError,
  ['data', 'angels']
);

const getAngelsForBooking = generateCommonSaga(
  API.getAngelsForBooking,
  onGetAngelsForBookingSuccess,
  onGetAngelsForBookingError,
  ['data', 'angels']
);

function* onAddAngelsToBooking(action) {
  try {
    const data = yield call(API.addAngelsToBooking, action.payload);
    const bookings = yield call(API.getBookings);
    if (data && bookings) {
      yield put(onGetBookingsSuccess(bookings.data.data.bookings.data));
      action.history.replace('/booking/offer/' + action.bookingId);
    }
  } catch (e) {
    yield put(onAddAngelsToBookingError(e));
  }
}
function* declineBooking(action) {
  try {
    const data = yield call(API.declineBooking, action.id, action.payload);
    if (data) {
      yield put(onDeclineBookingSuccess());
      action.history.push('/bookings');
    }
  } catch (e) {
    yield put(onDeclineBookingError(e));
  }
}

function* angelAcceptBooking(action) {
  try {
    const data = yield call(API.angelAcceptBooking, action.id, action.payload);
    if (data) {
      yield put(onAngelAcceptBookingSuccess());
      action.history.push('/booking');
    }
  } catch (e) {
    yield put(onAngelAcceptBookingError(e));
  }
}
function* angelDeclineBooking(action) {
  try {
    const data = yield call(API.angelDeclineBooking, action.id, action.payload);
    if (data) {
      yield put(onAngelDeclineBookingSuccess());
      action.history.push('/booking');
    }
  } catch (e) {
    yield put(onAngelDeclineBookingError(e));
  }
}

function* angelSearchWatcher() {
  yield takeLatest(ANGELS_SEARCH_PENDING, onAngelsSearch);
}
function* getBookingsWatcher() {
  console.log("getBookingsWatcher")
  yield takeLatest(GET_BOOKINGS_PENDING, getBookings);
}
function* addAngelsToBookingWatcher() {
  yield takeLatest(ADD_ANGELS_TO_BOOKING_PENDING, onAddAngelsToBooking);
}
function* declineBookingWatcher() {
  yield takeLatest(DECLINE_BOOKING_PENDING, declineBooking);
}
function* getAngelsForBookingWatcher() {
  yield takeLatest(GET_ANGELS_FOR_BOOKING_PENDING, getAngelsForBooking);
}
function* angelAcceptBookingWatcher() {
  yield takeLatest(ANGEL_BOOKING_ACCEPT_PENDING, angelAcceptBooking);
}
function* angelDeclineBookingWatcher() {
  yield takeLatest(ANGEL_BOOKING_DECLINE_PENDING, angelDeclineBooking);
}

export default [
  fork(angelSearchWatcher),
  fork(getBookingsWatcher),
  fork(getAngelsForBookingWatcher),
  fork(addAngelsToBookingWatcher),
  fork(declineBookingWatcher),
  fork(angelAcceptBookingWatcher),
  fork(angelDeclineBookingWatcher),
];
