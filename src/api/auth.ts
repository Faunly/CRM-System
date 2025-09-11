/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RegisterTypes, LoginTypes } from '../types/auth';
import { setAuthToken } from '../util/auth';
import { setRefreshToken } from '../util/refresh';

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
  } catch (error: any) { //FIXME
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

    setAuthToken(accessToken)
    setRefreshToken(refreshToken)

    return response;
  } catch (error: any) { // FIXME
    if (error.response) {
      console.log(error.response.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};
