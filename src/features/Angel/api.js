import axios from '../../axios';
import { apiResponseHandler, apiErrorHandler } from 'Utils';

export default {
  getAngel(id) {
    return axios
      .get('/angel/' + id)
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  getRatings(id) {
    return axios
      .get('/angel/ratings/' + id)
      .then(apiResponseHandler)
      .catch(apiErrorHandler);
  },
  angelLike(angel_id) {
    return axios.post('/angel/like', { angel_id: angel_id });
  },
  angelUnLike(angel_id) {
    return axios.post('/angel/unlike', { angel_id: angel_id });
  },
};
