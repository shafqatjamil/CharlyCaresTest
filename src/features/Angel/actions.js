export const GET_ANGEL_PENDING = 'booking/angel/getAngelPending';
export const GET_ANGEL_FAILURE = 'booking/angel/getAngelFailure';
export const GET_ANGEL_SUCCESS = 'booking/angel/getAngelSuccess';

export const getAngel = payload => ({
  type: GET_ANGEL_PENDING,
  payload,
});

export const onGetAngelFailure = errors => ({
  type: GET_ANGEL_FAILURE,
  errors,
});

export const onGetAngelSuccess = payload => ({
  type: GET_ANGEL_SUCCESS,
  payload,
});
