import axios from '../../../axios';

export default {
  getFamilies() {
    return axios.get('/favorites/angel');
  },
  getFamilyProfile(id) {
    return axios.get('/family/' + id);
  },
  getActiveSitting() {
    return axios.get('/active_timings/time');
  },
};
