import { takeLatest, fork, put, call } from 'redux-saga/effects';

import {
  CREATE_BOOKING_PENDING,
  onCreateSuccess,
  onCreateError,
} from './actions';
import { clearSelectedAngels } from '../data/actions';
import { onClearDays } from '../Create/actions';
import API from './api';

function* createBooking(action) {
  try {
    const res = yield call(API.createBooking, action.payload);
    console.log('res: ', res);

    if (res.status === 200) {
      yield put(onCreateSuccess(action.history));
      yield put(clearSelectedAngels());
      yield put(onClearDays());
    }
  } catch (err) {
    yield put(onCreateError(err));
  }
}

function* createBookingWatcher() {
  yield takeLatest(CREATE_BOOKING_PENDING, createBooking);
}

export default [fork(createBookingWatcher)];
