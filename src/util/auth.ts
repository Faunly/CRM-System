import { clearAccessToken } from './accessTokenManager';

export const forceLogout = () => {
  cleanTokens();
  // return redirect('/login')1
  window.location.href = '/login'; // по другому не работает
};

export const cleanTokens = () => {
  clearAccessToken();
  localStorage.removeItem('refreshToken');
};
