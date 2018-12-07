import { combineReducers } from 'redux';
import signupReducer from './Signup/reducer';
import bookingReducer from './Booking/reducer';
import loginReducer from './Login/reducer';
import favoritesReducer from './Favorites/reducer';
import paymentsReducer from './Payments/reducer';
import profileReducer from './Profile/reducer';
import chatReducer from './Chat/reducer';
import calendarReducer from './Calendar/reducer';
import angelFamiliesReducer from './AngelFamilies/reducer';

const featuresReducer = combineReducers({
  signup: signupReducer,
  booking: bookingReducer,
  login: loginReducer,
  favorites: favoritesReducer,
  payments: paymentsReducer,
  profile: profileReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  families: angelFamiliesReducer,
});

export default featuresReducer;
