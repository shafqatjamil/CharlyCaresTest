import axios from 'axios';

export const TIMEOUT = 15000;

const BETA_URL = 'https://charlycares-backend-beta.herokuapp.com/api/v1';
const DEV_URL = 'https://charlycares-backend-beta.herokuapp.com/api/v1';

const devServer = axios.create({
  baseURL: BETA_URL,
  timeout: TIMEOUT,
});

export default devServer;
