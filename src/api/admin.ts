import axios from 'axios';
import { getAccessToken } from '../util/tokenManager';
import { updateAccessToken } from './auth';
import { forceLogout } from '../util/auth';
import { UsersData } from '../types/profile';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/admin/users',
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
        console.error('error refresh');
        forceLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const getUsersData = async (params: {
  currentPage: number;
  currentLimit: number;
  isBloked: boolean;
  sortOrder: string;
  sortBy: string;
  search: string;
}) => {
  try {
    const response = await instanceAxios.get<UsersData>('', {
      params,
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const blockUser = async (id: number) => {
  try {
    await instanceAxios.post(`${id}/block`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw Error('Ошибка блокировки пользователя');
    }
    throw new Error('Неизвестная ошибка');
  }
};
