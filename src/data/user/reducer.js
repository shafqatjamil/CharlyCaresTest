import { LOGOUT, SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actionTypes';
import { GET_USER_PROFILE_DATA_SUCCESS, GET_PROFILE_SUCCESS } from './actions';
import omit from 'ramda/es/omit';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload.user.profile,
      };
    case LOGIN_SUCCESS:
      try {
        var parameters = {
          'isLoggedIn' : true,
          'sessionToken': action.payload.token
        }
        window.webkit.messageHandlers.iOS.postMessage(parameters);
        // window.webkit.messageHandlers.iOS.postMessage('isLoggedIn');
      } catch (err) {
        if (typeof window.Android !== 'undefined') {
          window.Android.isLoggedIn();
        }
      }
      return {
        ...state,
        ...omit(['token', 'role'], action.payload),
      };
    case GET_USER_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.profile,
        },
      };
    case LOGOUT:
      return {};

    default:
      return state;
  }
};
