export const getToken = (key: string) => {
  const token = localStorage.getItem(key);

  if (!token) {
    return null;
  }

  return token;
};

export const setToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

export const cleanTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessTokenExpiration');
  localStorage.removeItem('refreshTokenExpiration');
};

export const tokenLoader = () => {
  return getToken('accessToken');
};

export const updateToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};
