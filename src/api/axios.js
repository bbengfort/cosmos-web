import axios from "axios";
import config from '../config';

export default axios.create({
  baseURL: config.apiBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const axiosProtected = axios.create({
  baseURL: config.apiBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});