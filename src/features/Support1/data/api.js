import axios from '../../../axios';

export default {
  getFamilySupportFAQs() {
    return axios.get('/faq', {
      headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMyLCJpc3MiOiJodHRwOi8vY2hhcmx5Y2FyZXMtYmFja2VuZC1iZXRhLmhlcm9rdWFwcC5jb20vYXBpL3YxL2F1dGgvc2lnbl9pbiIsImlhdCI6MTU0MjgyMjU3OSwiZXhwIjoxNTQ3MTQyNTc5LCJuYmYiOjE1NDI4MjI1NzksImp0aSI6IkJ6RUNHOHp4M0g3bEVUOUwifQ.4pdRb87uXiaW3ARC04R0i2mdJBdupb23TOZ5C41rDwg' },
    });
  },
  getAngleSupportFAQs() {
    return axios.get('/faq', {
      headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMyLCJpc3MiOiJodHRwOi8vY2hhcmx5Y2FyZXMtYmFja2VuZC1iZXRhLmhlcm9rdWFwcC5jb20vYXBpL3YxL2F1dGgvc2lnbl9pbiIsImlhdCI6MTU0MjgyMjU3OSwiZXhwIjoxNTQ3MTQyNTc5LCJuYmYiOjE1NDI4MjI1NzksImp0aSI6IkJ6RUNHOHp4M0g3bEVUOUwifQ.4pdRb87uXiaW3ARC04R0i2mdJBdupb23TOZ5C41rDwg' },
    });
  },
};
