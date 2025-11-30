import { cleanTokens } from './tokenManager';

export const forceLogout = () => {
  cleanTokens();
  // return redirect('/login')1
  window.location.href = '/login'; // по другому не работает
};
