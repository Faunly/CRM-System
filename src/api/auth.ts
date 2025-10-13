import axios from 'axios';
import { RegisterTypes, LoginTypes } from '../types/auth';
import { getToken, setToken } from '../util/tokens';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/auth',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: RegisterTypes) => {
  try {
    const response = await instanceAxios.post('signup', {
      email: data.email,
      login: data.login,
      password: data.password,
      phoneNumber: data.phone,
      username: data.username,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const LoginUser = async (data: LoginTypes) => {
  try {
    const response = await instanceAxios.post('signin', {
      login: data.login,
      password: data.password,
    });
    const accessToken = response?.data.accessToken;
    const refreshToken = response?.data.refreshToken;

    setToken('accessToken', accessToken);
    setToken('refreshToken', refreshToken);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const updateAccessToken = async () => {
  try {
    let accessToken = getToken('accessToken');
    let refreshToken = getToken('refreshToken');
    const response = await instanceAxios.post(
      'refresh',
      { refreshToken },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    if (!accessToken || !refreshToken) {
      return 'Tokens undefined';
    }

    setToken('accessToken', accessToken);
    setToken('refreshToken', refreshToken);

    console.log('Access Token update successfully!');

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  }
};
