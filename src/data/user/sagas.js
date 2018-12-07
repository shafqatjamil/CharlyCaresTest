import {
  SIGNUP_REQ_FAMILY,
  SIGNUP_REQ_ANGEL,
  onSignupFailure,
  onSignupSuccess,
  onGetUserProfileDataSuccess,
  onGetUserProfileDataError,
  GET_USER_PROFILE_DATA_PENDING,
  UPDATE_PROFILE_DATA,
  onGetProfileSuccess,
  onGetProfileError,
  GET_PROFILE_PENDING,
} from './actions';
import { getChildrenAge } from 'Utils';

import { put, takeLatest, fork, call } from 'redux-saga/effects';
import mergeDeepLeft from 'ramda/es/mergeDeepLeft';

import { LOGIN_REQ, onLoginSuccess, onLoginFail } from '../user/actions';
import axios from '../../axios';
import UserAPI from './api';

function* signupFamily(action) {
  try {
    const api = yield call(UserAPI.familySignupSubmit, action.payload);

    axios.defaults.headers.common['Authorization'] = `Bearer ${
      api.data.data.token
    }`;

    const { user } = api.data.data;

    window.analytics.identify(user.profile.user_id, {
      channel: 'web',
      method: 'email',
      firstName: action.payload.first_name,
      lastName: action.payload.last_name,
      postalCodeArea: action.payload.postalcode,
      city: action.payload.city,
      email: action.payload.email,
      role: 'family',
      phone: action.payload.phone,
    });

    window.analytics.track('FSignUp', {
      channel: 'web',
      method: 'email',
      postalCodeOK: action.payload.postalcode ? true : false,
      city: action.payload.city,
    });

    yield call(UserAPI.childrenSubmit, action.payload.kids);
    yield call(UserAPI.setLanguages, action.payload.languages);
    yield put(onSignupSuccess(api.data.data));

    // yield put(onEmailSignupReset());
    // yield put(onSignupFlowFinish());

    const { baby, toddler, smallChild } = getChildrenAge(action.payload.kids);

    window.analytics.track('FCompleteProfile', {
      kids: action.payload.kids.length,
      baby,
      toddler,
      smallChild,
    });

    window.analytics.alias(user.profile.user_id);
  } catch (error) {
    yield put(onSignupFailure(error));
  }
}

function* signupAngel(action) {
  try {
    const api = yield call(UserAPI.angelSignupSubmit, action.payload);

    axios.defaults.headers.common['Authorization'] = `Bearer ${
      api.data.data.token
    }`;

    const { user } = api.data.data;

    window.analytics.identify(user.profile.user_id, {
      channel: 'web',
      method: 'email',
      firstName: action.payload.first_name,
      lastName: action.payload.last_name,
      postalCodeArea: action.payload.postalcode,
      city: action.payload.city,
      email: action.payload.email,
      role: 'angel',
      phone: action.payload.phone,
    });

    window.analytics.track('ASignup', {
      channel: 'web',
      method: 'email',
      postalCodeOK: action.payload.postalcode ? true : false,
      city: action.payload.city,
    });

    window.analytics.alias(user.profile.user_id);

    yield put(onSignupSuccess(api.data.data));
  } catch (error) {
    yield put(onSignupFailure(error));
  }
}

function* login(action) {
  try {
    const { data } = yield call(UserAPI.login, action.payload);
    if (data) {
      let getData;
      let angelProfile;
      const { role, token } = data.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (role === 'family') {
        getData = yield call(UserAPI.getFamily, token);
      }

      if (getData) {
        window.analytics.track('FLogin', {
          userId: getData.data.data.user_id,
        });
        window.analytics.identify(getData.data.data.user_id, {
          userId: getData.data.data.user_id,
        });
      }

      if (role === 'angel') {
        getData = yield call(UserAPI.getAngel, token);
        angelProfile = yield call(UserAPI.getProfile, token);
      }

      const referralRes = yield call(UserAPI.getReferralSettings);

      if (getData.data && role === 'family') {
        const userData = mergeDeepLeft(
          { ...getData.data.data, referralSettings: referralRes.data.data },
          data.data
        );
        yield put(onLoginSuccess(userData));
      } else if (getData.data && role === 'angel') {
        const userData = mergeDeepLeft(
          { ...getData.data.data, referralSettings: referralRes.data.data },
          data.data,
          angelProfile.data.data
        );
        yield put(onLoginSuccess(userData));
      } else {
        yield put(onLoginFail());
      }
    }
  } catch (error) {
    yield put(onLoginFail(error));
  }
}

function* getUserProfileData(action) {
  try {
    let payload;
    if (action.role === 'family') {
      const userRes = yield call(UserAPI.getUser);
      const profileRes = yield call(UserAPI.getProfile);
      const membershipRes = yield call(UserAPI.getMembership);
      const referralRes = yield call(UserAPI.getReferralSettings);
      const languagesRes = yield call(UserAPI.getLanguages);
      payload = {
        ...userRes.data.data,
        profile: { ...profileRes.data.data, languages: languagesRes.data.data },
        membershipData: membershipRes.data.data,
        referralSettings: referralRes.data.data,
        languages: languagesRes.data.data,
      };
    } else {
      const profileRes = yield call(UserAPI.getProfile);
      const userRes = yield call(UserAPI.getUser);
      const referralRes = yield call(UserAPI.getReferralSettings);
      const messages = yield call(UserAPI.getUserMessages);
      const angel = yield call(UserAPI.getAngelData);
      payload = {
        ...userRes.data.data,
        ...angel.data.data,
        profile: { ...profileRes.data.data },
        referralSettings: referralRes.data.data,
        unreadMessages: messages.data.data,
      };
    }
    yield put(onGetUserProfileDataSuccess(payload));
  } catch (error) {
    yield put(onGetUserProfileDataError(error));
  }
}

function* getProfile() {
  try {
    const profileRes = yield call(UserAPI.getProfile);
    const languagesRes = yield call(UserAPI.getLanguages);

    yield put(
      onGetProfileSuccess({
        profile: { ...profileRes.data.data, languages: languagesRes.data.data },
      })
    );
  } catch (e) {
    yield put(onGetProfileError(e));
  }
}

function* updateUserProfileData(action) {
  try {
    const profileRes = yield call(UserAPI.getProfile);
    yield put(onGetUserProfileDataSuccess(profileRes.data.data));
  } catch (error) {
    yield put(onGetUserProfileDataError(error));
  }
}

function* watchFamilySignup() {
  yield takeLatest(SIGNUP_REQ_FAMILY, signupFamily);
}

function* watchAngelSignup() {
  yield takeLatest(SIGNUP_REQ_ANGEL, signupAngel);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQ, login);
}
function* getUserProfileDataWatcher() {
  yield takeLatest(GET_USER_PROFILE_DATA_PENDING, getUserProfileData);
}
function* updateUserProfileDataWatcher() {
  yield takeLatest(UPDATE_PROFILE_DATA, updateUserProfileData);
}
function* getProfileWatcher() {
  yield takeLatest(GET_PROFILE_PENDING, getProfile);
}

export default [
  fork(watchFamilySignup),
  fork(watchAngelSignup),
  fork(watchLogin),
  fork(getUserProfileDataWatcher),
  fork(updateUserProfileDataWatcher),
  fork(getProfileWatcher),
];
