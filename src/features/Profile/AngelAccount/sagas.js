import { put, fork, takeLatest, call } from 'redux-saga/effects';

import {
  onUpdateProfileSuccess,
  onUpdateProfileError,
  UPDATE_PROFILE_PENDING,
} from './actions';
import API from './api';

function* onProfileUpdate(action) {
  try {
    if (Object.keys(action.payload.languages).length) {
      yield call(API.updateLanguages, action.payload.languages);
    }
    if (
      Object.keys(action.payload.profile).length ||
      typeof action.payload.profile.driving_license === 'boolean' ||
      Object.keys(action.payload.angelData).length
    ) {
      yield call(API.updateAngel, {
        ...action.payload.angelData,
        ...action.payload.profile.rates,
        driving_license: action.payload.profile.driving_license,
      });
    }
    if (action.payload.video) {
      yield call(API.uploadVideo, action.payload.url, action.payload.video);
      yield call(API.videoUploaded);
    }

    yield put(onUpdateProfileSuccess());
  } catch (error) {
    yield put(onUpdateProfileError(error));
  }
}

function* onProfileUpdateWatcher(action) {
  yield takeLatest(UPDATE_PROFILE_PENDING, onProfileUpdate);
}

export default [fork(onProfileUpdateWatcher)];
