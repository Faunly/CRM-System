import axios from 'axios';
import { RegisterTypes, LoginTypes } from '../types/auth';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: RegisterTypes) => {
  try {
    const response = await instanceAxios.post('/auth/signup', {
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
    const response = await instanceAxios.post('/auth/signin', {
      login: data.login,
      password: data.password,
    });
    console.log('Tokens:', response?.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};
