import { GET_ANGEL_EVENTS_SUCCESS } from './actions';

const initialState = {
  events: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANGEL_EVENTS_SUCCESS:
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    default:
      return state;
  }
};
