import axios from 'axios';
import Env from 'config/Env';

const api = axios.create({
  baseURL: Env.BASE_URL,
});

export default api;
