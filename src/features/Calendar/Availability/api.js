import axios from '../../../axios';

export default {
  getEvents(startDate, endDate, id) {
    if (Boolean(id)) {
      return axios.get(`/events/${startDate}/${endDate}/${id}`);
    }
    return axios.get(`/events/${startDate}/${endDate}`);
  },

  getEventsFamily(startDate, endDate) {
    return axios.get(`/family_events/${startDate}/${endDate}`);
  },
};
