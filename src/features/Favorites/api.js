import axios from '../../axios';

export default {
  getFavorites() {
    return axios.get('/favorites');
  },
  getActiveSitting() {
    return axios.get('/active_timings/time');
  },
};
