import { GET_MESSAGES_SUCCESS } from './actions';

const initialState = {
  messages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};
