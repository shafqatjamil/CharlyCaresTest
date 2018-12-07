import axios from '../../../axios';

export default {
  getMessages() {
    return axios.get('/messages');
  },
  getAngelData() {
    return axios.get('/angelData');
  },
  getReferrals() {
    return axios.get('/referral/settings');
  },
  updateRates(data) {
    return axios.put('/angel', data);
  },
};
