import {
  ANGELS_SEARCH_SUCCESS,
  ON_ANGEL_SELECT,
  GET_BOOKINGS_SUCCESS,
  ON_ANGELS_FILTER,
  SELECTED_ANGELS_RESET,
  GET_ANGELS_FOR_BOOKING_SUCCESS,
  SET_SELECTED_ANGELS,
} from './actions';

const initialState = {
  availableAngels: [],
  filteredAngels: {
    match: [],
    notMatch: [],
    numberOfActiveFilters: 0,
  },
  selectedAngels: [],
  faqs: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANGELS_FOR_BOOKING_SUCCESS:
    case ANGELS_SEARCH_SUCCESS:
      return {
        ...state,
        availableAngels: action.payload,
      };
    case ON_ANGEL_SELECT:
      return {
        ...state,
        selectedAngels: action.payload,
      };
    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        faqs: action.payload,
      };
    case ON_ANGELS_FILTER:
      return {
        ...state,
        filteredAngels: action.payload,
      };
    case SELECTED_ANGELS_RESET:
      return {
        ...state,
        selectedAngels: [],
      };
    case SET_SELECTED_ANGELS:
      return {
        ...state,
        selectedAngels: action.payload,
      };
    default:
      return state;
  }
};
