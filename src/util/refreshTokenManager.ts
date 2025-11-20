import { getAccessToken } from './accessTokenManager';

export const accessTokenLoader = () => {
  return getAccessToken();
};

export const getRefreshToken = () => {
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    return null;
  }

  return token;
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};
