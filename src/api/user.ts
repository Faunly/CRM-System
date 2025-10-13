import axios from 'axios';
import { cleanTokens, getToken } from '../util/tokens';
import { updateAccessToken } from './auth';
import { forceLogout } from '../util/auth';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/user/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await updateAccessToken();
        const accessToken = getToken('accessToken');
        error.config.headers.Authorization = accessToken;

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
    const accessToken = getToken('accessToken');
    const response = await instanceAxios.get('profile', {
      headers: {
        Authorization: accessToken,
      },
    });
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
    const accessToken = getToken('accessToken');

    const response = await instanceAxios.post(
      'logout',
      {},
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

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
