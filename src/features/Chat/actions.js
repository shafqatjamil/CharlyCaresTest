import { actionCreatorGenerator } from 'Utils';

export const GET_MESSAGES_PENDING = 'chat/getMessagesPending';
export const GET_MESSAGES_SUCCESS = 'chat/getMessagesSuccess';
export const GET_MESSAGES_ERROR = 'chat/getMessagesError';
export const SEND_MESSAGE_PENDING = 'chat/sendMessagePending';
export const SEND_MESSAGE_SUCCESS = 'chat/sendMessageSuccess';
export const SEND_MESSAGE_ERROR = 'chat/sendMessageError';

export const onGetMessages = actionCreatorGenerator(
  GET_MESSAGES_PENDING,
  'userId',
  'perPage',
  'page'
);
export const onGetMessagesSuccess = actionCreatorGenerator(
  GET_MESSAGES_SUCCESS,
  'payload'
);
export const onGetMessagesError = actionCreatorGenerator(
  GET_MESSAGES_ERROR,
  'errors'
);

export const onSendMessage = actionCreatorGenerator(
  SEND_MESSAGE_PENDING,
  'payload'
);
export const onSendMessageSuccess = actionCreatorGenerator(
  SEND_MESSAGE_SUCCESS,
  'payload'
);
export const onSendMessageError = actionCreatorGenerator(
  SEND_MESSAGE_ERROR,
  'errors'
);
