import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip,deflate,compress' // It's necessary to work on axios ^1.2.1
  },
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const res = error.response;
    return Promise.reject(res);
  },
);

export default api;
