import { errorCatch } from '../utils';
import axios from 'axios';

import { localStorageHelper } from 'src/shared/helpers/localStorage';

export const apiBaseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageHelper.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    if ((error.response.status === 401 || errorCatch(error) === 'Token expired') && error.config) {
      localStorageHelper.remove('token');
    }

    throw error;
  }
);

export const apiAuthInstance = axiosInstance;
