import { SUCCESS, ERROR, RESET, PENDING, TIMEOUT } from './actions';

const initialState = {
  isLoading: false,
  errors: null,
};

const loadingReducer = (state, action) => {
  const isLoadingAction = action.type.endsWith(PENDING);
  const isSuccessOrErrorAction =
    action.type.endsWith(SUCCESS) || action.type.endsWith(ERROR);

  if (isLoadingAction) return true;

  if (isSuccessOrErrorAction) return false;

  return state;
};

const errorReducer = (state, action) => {
  const isLoadingOrResetAction =
    action.type.endsWith(PENDING) || action.type.endsWith(RESET);
  const isErrorAction =
    action.type.endsWith(ERROR) || action.type.endsWith(TIMEOUT);
  if (isLoadingOrResetAction) return null;
  if (isErrorAction) return action.errors;

  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        isLoading: loadingReducer(state.isLoading, action),
        errors: errorReducer(state.errors, action),
      };
  }
};
