const createTokenManager = () => {
  let accessToken: string | null = null;

  return {
    setAccessToken: (token: string) => {
      accessToken = token;
    },
    getAccessToken: () => {
      return accessToken;
    },
    clearAccessToken: () => {
      accessToken = null;
    },
  };
};

export const { setAccessToken, getAccessToken, clearAccessToken } =
  createTokenManager();

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

export const cleanTokens = () => {
  clearAccessToken();
  localStorage.removeItem('refreshToken');
};
