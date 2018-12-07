import { combineReducers } from 'redux';
import availabilityReducer from './Availability/reducer';
import notAvailableReducer from './NotAvailable/reducer';

const calendarReducers = combineReducers({
  availability: availabilityReducer,
  notAvailable: notAvailableReducer,
});

export default calendarReducers;
