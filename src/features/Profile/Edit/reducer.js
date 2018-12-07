import { UPDATE_PROFILE_SUCCESS, UPDATE_STATUS_RESET } from './actions';

const initialState = {
  isProfileUpdated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isProfileUpdated: true,
      };
    case UPDATE_STATUS_RESET:
      return {
        ...state,
        isProfileUpdated: false,
      };
    default:
      return state;
  }
};
