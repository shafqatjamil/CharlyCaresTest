import axios from '../../../axios';

export default {
  addInCalendar(data) {
    return axios.post('/events', data);
  },
};
