import axios from 'axios';
import { cleanTokens, getToken } from '../util/tokens';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/user/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getProfileData = async () => {
  try {
    const accessToken = getToken('accessToken');
    const response = await instanceAxios.get('profile', {
      headers: {
        Authorization: accessToken,
      },
    });
    return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // FIXME
    if (error.response) {
      console.log(error.response.data);
      throw new Error('Ошибка получение данных');
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const logoutUser = async () => {
  try {
    const accessToken = getToken('accessToken');
    console.log('test');
    const response = await instanceAxios.post(
      'logout',
      {},
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    console.log('logout', accessToken);

    return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw new Error('Ошибка отправления данных');
    }
    throw new Error('Неизвестная ошибка');
  } finally {
    cleanTokens();
  }
};
