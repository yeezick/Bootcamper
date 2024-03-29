import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const getToken = async () => {
  const localToken = await SecureStore.getItemAsync('token');
  return `Bearer ${localToken || null}`;
};

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://bootcamper-dev-backend.herokuapp.com/api'
      : 'http://localhost:8001/api',
});

api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = await getToken();
    return config;
  },
  (error) => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);
