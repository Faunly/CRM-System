/* eslint-disable @typescript-eslint/no-explicit-any */
// FIXME
import axios from 'axios';
import { RegisterTypes, LoginTypes } from '../types/auth';
import { cleanTokens, getAuthToken, setAuthToken } from '../util/auth';
import { setRefreshToken } from '../util/auth';

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
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
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

    setAuthToken(accessToken);
    setRefreshToken(refreshToken);

    return response;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const logoutUser = async () => {
  try {
    const accessToken = getAuthToken();
    const responce = await instanceAxios.post('logout', {
      headers: {
        Authorization: accessToken,
      },
    });

    return responce?.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw new Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  } finally {
    cleanTokens();
  }
};
