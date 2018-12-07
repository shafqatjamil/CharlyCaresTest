import accountSettingsSagas from './AccountSettings/sagas';
import creditSagas from './Credit/sagas';
import membershipSagas from './Membership/sagas';
import editProfileSagas from './Edit/sagas';
import angelAccountSagas from './AngelAccount/sagas';
import angelPreferencesSagas from './AngelPreferences/sagas';
import angelDashboardSagas from './AngelDashboard/sagas';

export default [
  ...accountSettingsSagas,
  ...creditSagas,
  ...membershipSagas,
  ...editProfileSagas,
  ...angelAccountSagas,
  ...angelPreferencesSagas,
  ...angelDashboardSagas,
];
