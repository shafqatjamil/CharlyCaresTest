import { put, fork, takeLatest, call } from 'redux-saga/effects';

import {
  UPDATE_PROFILE_PENDING,
  onUpdateProfileError,
  onUpdateProfileSuccess,
} from './actions';

import API from './api';

function* onProfileUpdate(action) {
  try {
    if (action.role === 'family') {
      if (action.image) {
        yield call(API.updateFamilyImage, action.image);
      }
      if (action.profile) {
        yield call(API.updateProfile, action.profile);
      }
    } else {
      if (action.image) {
        yield call(API.updateAngelImage, action.image);
      }
      if (action.profile) {
        yield call(API.updateProfile, action.profile);
      }
    }
    if (action.languages) {
      yield call(API.updateLanguages, action.languages);
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
