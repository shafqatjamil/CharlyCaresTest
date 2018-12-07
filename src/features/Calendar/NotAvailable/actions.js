import { actionCreatorGenerator } from 'Utils';

export const SET_CURRENT_DATE = 'calendar/notAvailable/setCurrentDate';
export const ADD_REPEAT_DAY = 'calendar/notAvailable/addRepeatDay';

export const onSetCurrentDate = actionCreatorGenerator(
  SET_CURRENT_DATE,
  'payload'
);
