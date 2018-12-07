import { SET_CURRENT_DATE } from './actions';

const initialState = {
  currentDate: null,
  repeatedDays: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };

    default:
      return state;
  }
};
