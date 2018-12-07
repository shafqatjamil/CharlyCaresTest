import {
  UPDATE_SETTINGS_PENDING,
  UPDATE_FB_INFO_PENDING,
  onSettingsUpdateError,
  onSettingsUpdateSuccess,
  onFBInfoSuccess,
  onFBInfoError,
} from './actions';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import API from './api';
import { generateCommonSaga } from 'Utils';

function* updateSettings(action) {
  const {
    phone,
    city,
    emailPromo,
    pushPromo,
    email,
    password,
    iban,
  } = action.payload;
  try {
    if (action.role === 'angel') {
      if (phone || city || iban) {
        yield call(API.updateProfile, {
          phone,
          city,
          iban,
        });
      }
      if (typeof emailPromo === 'boolean' || typeof pushPromo === 'boolean') {
        yield call(API.updateAngelSettings, {
          promo_mail: emailPromo,
          promo_push: pushPromo,
        });
      }
      if (email || password) {
        yield call(API.updateUser, {
          email,
          password,
        });
      }
    } else {
      if (phone || city) {
        yield call(API.updateProfile, {
          phone,
          city,
        });
      }
      if (typeof emailPromo || typeof pushPromo) {
        yield call(API.updateFamilySettings, {
          promo_mail: emailPromo,
          promo_push: pushPromo,
        });
      }
      if (email || password) {
        yield call(API.updateUser, {
          email,
          password,
        });
      }
    }
    yield put(onSettingsUpdateSuccess());
  } catch (err) {
    yield put(onSettingsUpdateError(err));
  }
}

const setFBInfo = generateCommonSaga(
  API.updateFBInfo,
  onFBInfoSuccess,
  onFBInfoError
);

function* updateSettingsWatcher() {
  yield takeLatest(UPDATE_SETTINGS_PENDING, updateSettings);
}
function* updateFBInfoWatcher() {
  yield takeLatest(UPDATE_FB_INFO_PENDING, setFBInfo);
}

export default [fork(updateSettingsWatcher), fork(updateFBInfoWatcher)];
