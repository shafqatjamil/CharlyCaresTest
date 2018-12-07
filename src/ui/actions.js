import { actionCreatorGenerator } from 'Utils';

export const PENDING = 'Pending';
export const ERROR = 'Error';
export const RESET = 'Reset';
export const SUCCESS = 'Success';
export const TIMEOUT = 'timeout';

export const ON_TIMEOUT = 'errors/timeoutError';
export const ERROR_RESET = 'ui/errorReset';

export const onTimeout = actionCreatorGenerator(ON_TIMEOUT, 'errors');
export const onErrorConfirm = actionCreatorGenerator(ERROR_RESET);
