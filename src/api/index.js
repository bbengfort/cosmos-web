import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8888/v1/',
  timeout: 15000,
});

export default api;
