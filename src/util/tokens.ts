export const getToken = (key: string) => {
  const token = localStorage.getItem(key);

  if (!token) {
    return null;
  }

  const tokenExpiration = getTokenDuration(`${key}Expiration`);

  if (tokenExpiration && tokenExpiration <= 0) {
    return 'EXPIRED';
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

export const setExpirationToken = (key: string, durationInMinutes: number) => {
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + durationInMinutes);
  localStorage.setItem(key, expiration.toISOString());
};

export const getTokenDuration = (key: string): number | null => {
  const storedExpirationDate = localStorage.getItem(key);

  if (!storedExpirationDate) {
    console.warn(`Expiration date for ${key} is not defined!`);
    return null;
  }

  const expirationDate = new Date(storedExpirationDate);
  if (isNaN(expirationDate.getTime())) {
    console.warn(`Invalid date format in ${key}`);
    return null;
  }

  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const updateToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};
