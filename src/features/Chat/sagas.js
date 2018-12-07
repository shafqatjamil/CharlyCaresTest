import { generateCommonSaga } from 'Utils';
import { fork, takeLatest, call, put } from 'redux-saga/effects';
import API from './api';
import {
  onGetMessagesSuccess,
  onGetMessagesError,
  GET_MESSAGES_PENDING,
  onSendMessageSuccess,
  onSendMessageError,
  SEND_MESSAGE_PENDING,
} from './actions';

function* getMessages(action) {
  try {
    const { userId, perPage, page } = action;
    const { data } = yield call(API.getMessagesPage, userId, perPage, page);
    console.log(data);
    yield put(onGetMessagesSuccess(data.data.messages));
  } catch (error) {
    yield put(onGetMessagesError(error));
  }
}

const sendMessage = generateCommonSaga(
  API.sendMessage,
  onSendMessageSuccess,
  onSendMessageError
);

function* getMessagesWatcher() {
  yield takeLatest(GET_MESSAGES_PENDING, getMessages);
}
function* sendMessageWatcher() {
  yield takeLatest(SEND_MESSAGE_PENDING, sendMessage);
}

export default [fork(getMessagesWatcher), fork(sendMessageWatcher)];
