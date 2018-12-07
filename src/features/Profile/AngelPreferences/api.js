import axios from '../../../axios';

export default {
  getPreferences() {
    return axios.get('/angel_preferences');
  },
  updatePreferences(data) {
    return axios.put('/angel_preferences', data);
  },
};
