import { GET_PREFERENCES_SUCCESS } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PREFERENCES_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};
