import axios from '../../axios';
import { apiErrorHandler, apiResponseHandler } from 'Utils';

export default {
  getAgendas() {
    return axios
      .get('/agendas/show')
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  getTimeslots(id, week = 1) {
    return axios
      .get(`/agenda/${id}/${week}`)
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  makeAppointment(id) {
    return axios
      .post('/agenda/makeAppointment', { id })
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
};
