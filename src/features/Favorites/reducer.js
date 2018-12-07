import { GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS } from './actions';

const initialState = {
  favorites: [],
  activeBabysitting: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES_AND_ACTIVE_BABYSITTING_SUCCESS:
      return {
        favorites: action.favorites,
        activeBabysitting: action.activeBabysitting,
      };
    default:
      return state;
  }
};
