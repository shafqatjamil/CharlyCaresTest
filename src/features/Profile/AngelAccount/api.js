import axios from '../../../axios';

export default {
  updateLanguages(data) {
    return axios.put('/language', data);
  },
  updateProfile(data) {
    return axios.put('/profile', data);
  },
  updateAngel(data) {
    return axios.put('/angel', data);
  },
  uploadVideo(url, file) {
    return axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
  },
  videoUploaded() {
    return axios.post('/angel/videoUploaded');
  },
};
