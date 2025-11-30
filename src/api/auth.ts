import axios, { AxiosResponse } from 'axios';
import { RegisterTypes, LoginTypes } from '../types/auth';
import { getRefreshToken, setRefreshToken } from '../util/refreshTokenManager';
import { getAccessToken, setAccessToken } from '../util/accessTokenManager';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/auth',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: RegisterTypes) => {
  try {
    const response = await instanceAxios.post<RegisterTypes>('signup', data);
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
    const response = await instanceAxios.post<LoginTypes, AxiosResponse>(
      'signin',
      {
        login: data.login,
        password: data.password,
      },
    );
    const accessToken = response?.data.accessToken;
    const refreshToken = response?.data.refreshToken;

    setRefreshToken(refreshToken);
    setAccessToken(accessToken);

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
    let accessToken = getAccessToken();
    let refreshToken = getRefreshToken();
    const response = await instanceAxios.post<
      { refreshToken: string },
      AxiosResponse
    >(
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

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

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
