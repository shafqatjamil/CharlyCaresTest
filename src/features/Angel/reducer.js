import { GET_ANGEL_SUCCESS } from './actions';

const intialState = {
  angel: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_ANGEL_SUCCESS:
      return {
        ...state,
        angel: action.payload,
      };
    default:
      return state;
  }
};
