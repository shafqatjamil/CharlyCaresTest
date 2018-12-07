import compose from 'ramda/es/compose';
import { REHYDRATE } from 'redux-persist/es/constants';
import { getExpirationTime, decodeToken, isTokenValid } from './utils';
import { LOGOUT, LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actionTypes';
import { onRehydrateSetTokenInHeader } from './actions';

const initialState = {
  token: null,
  expireAt: null,
  isAuthenticated: false,
  role: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        expireAt: compose(getExpirationTime, decodeToken)(action.payload.token),
        isAuthenticated: true,
        role: action.payload.user.role,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        expireAt: compose(getExpirationTime, decodeToken)(action.payload.token),
        isAuthenticated: true,
        role: action.payload.role,
      };
    case REHYDRATE:
      const isTokenExistAndValid =
        action.payload && isTokenValid(action.payload.token);
      if (isTokenExistAndValid) {
        onRehydrateSetTokenInHeader(action.payload.token);
      }
      return {
        ...state,
        isAuthenticated: isTokenExistAndValid,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        expireAt: null,
        isAuthenticated: false,
        role: null,
      };

    default:
      return state;
  }
};
