import axios from 'axios';
import { cleanTokens } from '../util/auth';
import { updateAccessToken } from './auth';
import { forceLogout } from '../util/auth';
import { getAccessToken } from '../util/accessTokenManager';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/user/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

instanceAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // фикс зацикливания
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await updateAccessToken();
        const accessToken = getAccessToken();

        originalRequest.headers.Authorization = accessToken;

        return instanceAxios(error.config);
      } catch (refreshError) {
        console.log('error refresh');
        forceLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const getProfileData = async () => {
  try {
    const response = await instanceAxios.get('profile');
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const logoutUser = async () => {
  try {
    const response = await instanceAxios.post('logout', {});
    console.log('logout');

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw Error('Ошибка отправления данных');
    }
    throw new Error('Неизвестная ошибка');
  } finally {
    cleanTokens();
  }
};
