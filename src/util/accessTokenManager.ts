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
