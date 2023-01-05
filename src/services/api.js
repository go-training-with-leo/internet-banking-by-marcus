import axios from 'axios';

const api = axios.create({
  baseURL: 'https://otp-server-app.onrender.com',
});

export default api;
