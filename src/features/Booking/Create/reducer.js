import moment from 'moment';
import { nearestMinutes } from 'Utils';

import {
  ON_ADD_DAY,
  ON_CLEAR_DAYS,
  ON_ADDRESS_SELECT,
  ON_RESERVATION_CHANGE,
  ON_CHILD_SELECT,
  ADD_REPEATED_DAY,
  CLEAR_REPEATED_DAYS,
  REMOVE_DAY,
} from './actions';

const initialState = {
  days: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_ADD_DAY:
      let date = moment();
      return {
        ...state,
        days: [
          ...state.days,
          {
            id: state.days.length + 1,
            initialDate: date.clone().format('YYYY-MM-DD'),
            initialStartTime: nearestMinutes(15, date).format('HH:mm'),
            startDate: state.days[state.days.length - 1]
              ? moment(
                  state.days[state.days.length - 1].startDate,
                  'YYYY-MM-DD'
                )
                  .add(1, 'day')
                  .format('YYYY-MM-DD')
              : date
                  .clone()
                  .add(2, 'h')
                  .format('YYYY-MM-DD'),
            startTime: state.days[state.days.length - 1]
              ? state.days[state.days.length - 1].startTime
              : nearestMinutes(15, date.clone().add(3, 'hour')).format('HH:mm'),
            endTime: state.days[state.days.length - 1]
              ? state.days[state.days.length - 1].endTime
              : nearestMinutes(15, date.clone().add(5, 'h')).format('HH:mm'),
            repetitions: [],
          },
        ],
      };
    case REMOVE_DAY:
      return {
        ...state,
        days: state.days.filter(day => day.id !== action.payload),
      };
    case ON_CLEAR_DAYS:
      const date1 = moment();
      return {
        ...state,
        days: [
          {
            id: 1,
            startDate: date1
              .clone()
              .add(2, 'h')
              .format('YYYY-MM-DD'),
            startTime: nearestMinutes(15, date1.clone().add(1, 'hour')).format(
              'HH:mm'
            ),
            initialDate: date1.clone().format('YYYY-MM-DD'),
            initialStartTime: nearestMinutes(15, date1).format('HH:mm'),
            endTime: nearestMinutes(15, date1.clone().add(3, 'h')).format(
              'HH:mm'
            ),
            repetitions: [],
          },
        ],
      };
    case ON_ADDRESS_SELECT:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case ON_CHILD_SELECT:
      return {
        ...state,
        selectedChildren: action.payload,
      };
    case ON_RESERVATION_CHANGE:
      return {
        ...state,
        days: action.payload,
      };
    case ADD_REPEATED_DAY:
      return {
        ...state,
        days: action.payload,
      };
    case CLEAR_REPEATED_DAYS:
      return {
        ...state,
        days: action.payload,
      };
    default:
      return state;
  }
};
