import { actionCreatorGenerator } from 'Utils';

export const GET_ANGEL_EVENTS_PENDING =
  'calendar/availability/getAngelEventsPending';
export const GET_ANGEL_EVENTS_SUCCESS =
  'calendar/availability/getAngelEventsSuccess';
export const GET_ANGEL_EVENTS_ERROR =
  'calendar/availability/getAngelEventsError';

export const onGetAngelEvents = actionCreatorGenerator(
  GET_ANGEL_EVENTS_PENDING,
  'payload'
);
export const onGetAngelEventsSuccess = actionCreatorGenerator(
  GET_ANGEL_EVENTS_SUCCESS,
  'payload'
);
export const onGetAngelEventsError = actionCreatorGenerator(
  GET_ANGEL_EVENTS_ERROR,
  'errors'
);
