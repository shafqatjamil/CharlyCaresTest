import { callAPI, actionHandler } from 'Utils';
import { takeLatest, fork, put } from 'redux-saga/effects';
import API from './api';

import {
  onGetAngelFailure,
  onGetAngelSuccess,
  GET_ANGEL_PENDING,
} from './actions';

function* getAngel(action) {
  const { api } = yield callAPI(API.getAngel, action.payload);
  const { api: ratings } = yield callAPI(API.getRatings, action.payload);

  yield actionHandler({
    apiRes: api,
    error: onGetAngelFailure,
  });

  yield actionHandler({
    apiRes: ratings,
    error: onGetAngelFailure,
    success: [
      put(
        onGetAngelSuccess({
          ...api.res.data,
          ratings: ratings.res.data,
        })
      ),
    ],
  });
}

function* getAngelWatcher() {
  yield takeLatest(GET_ANGEL_PENDING, getAngel);
}

export default [fork(getAngelWatcher)];
