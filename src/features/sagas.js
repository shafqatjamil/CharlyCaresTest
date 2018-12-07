import signupSagas from './Signup/sagas';
import bookingSagas from './Booking/sagas';
import favoritesSagas from './Favorites/sagas';
import paymentsSagas from './Payments/sagas';
import profileSagas from './Profile/sagas';
import chatSagas from './Chat/sagas';
import calendarSagas from './Calendar/sagas';
import angelFamiliesSagas from './AngelFamilies/sagas';
import supportSagas from './Support1/sagas'

export default [
  ...signupSagas,
  ...bookingSagas,
  ...favoritesSagas,
  ...paymentsSagas,
  ...profileSagas,
  ...chatSagas,
  ...calendarSagas,
  ...angelFamiliesSagas,
  ...supportSagas
];
