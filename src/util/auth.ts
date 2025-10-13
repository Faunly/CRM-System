import { redirect } from 'react-router';
import { cleanTokens, getToken } from './tokens';

export const checkAuthLoader = () => {
  const token = getToken('accessToken');

  if (!token) {
    console.log('token undefined! Return to login page');
    return redirect('/login');
  }
  
  console.log('token exists!');
};

export const forceLogout = () => {
  cleanTokens();
  // return redirect('/login')
  window.location.href = '/login'; // по другому не работает 
};
