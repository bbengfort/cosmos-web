import axios from "axios";
import config from '../config';

const API = axios.create({
  baseURL: config.apiBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const status = async () => {
  try {
    const rep = await API.get('status');
    return rep.data
  } catch (error) {
    if (error.response && error.response.status === 503) {
      return error.response.data;
    }
    return {'status': 'offline', 'uptime': '', 'version': ''};
  }
};

export default API;
