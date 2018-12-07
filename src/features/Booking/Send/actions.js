import { actionCreatorGenerator } from 'Utils';

export const CREATE_BOOKING_PENDING = 'booking/send/sendPending';
export const CREATE_BOOKING_ERROR = 'booking/send/sendError';
export const CREATE_BOOKING_SUCCESS = 'booking/send/sendSuccess';
export const MESSAGE_CHANGE = 'booking/send/messageChange';

export const onCreateBooking = actionCreatorGenerator(
  CREATE_BOOKING_PENDING,
  'payload',
  'history'
);

export const onCreateError = actionCreatorGenerator(
  CREATE_BOOKING_ERROR,
  'errors'
);
export const onCreateSuccess = history => {
  history.replace('/booking');

  return {
    type: CREATE_BOOKING_SUCCESS,
  };
};

export const onMessageChange = actionCreatorGenerator(
  MESSAGE_CHANGE,
  'payload'
);
