import axios from 'axios';
import { getAuthToken } from '../util/auth';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1/user/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getProfileData = async () => {
  try {
    const accessToken = getAuthToken();
    const responce = await instanceAxios.get('profile', {
      headers: {
        Authorization: accessToken,
      },
    });
    return responce?.data;
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
