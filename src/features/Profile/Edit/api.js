import axios from '../../../axios';

export default {
  updateFamilyImage(data) {
    return axios.post('/family/photo', data);
  },
  updateAngelImage(data) {
    return axios.post('/angel/photo', data);
  },
  updateProfile(data) {
    return axios.put('/profile/family', data);
  },
  updateLanguages(data) {
    return axios.put('/language', data);
  },
};
