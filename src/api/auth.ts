import axios, { AxiosResponse } from 'axios';
import { BackendRegisterPayload, LoginTypes } from '../types/auth';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
} from '../util/tokenManager';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/auth',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: BackendRegisterPayload) => {
  try {
    const response = await instanceAxios.post<BackendRegisterPayload>(
      'signup',
      data,
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const loginUser = async (data: LoginTypes) => {
  try {
    const response = await instanceAxios.post<LoginTypes, AxiosResponse>(
      'signin',
      data,
    );
    const accessToken = response?.data.accessToken;
    const refreshToken = response?.data.refreshToken;

    setRefreshToken(refreshToken);
    console.log(accessToken);
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

    console.log('Access Token update successfully!', ':', accessToken);

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  }
};
