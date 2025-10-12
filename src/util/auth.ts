import { redirect } from 'react-router';
import { getToken } from './tokens';
import { updateAccessToken } from '../api/auth';

export const checkAuthLoader = () => {
  const token = getToken("accessToken");

  if (!token) {
    console.log('token undefined! Return to login page');
    return redirect('/login');
  }

  if (token === 'EXPIRED') {
      updateAccessToken();
  } 

  console.log('token exists!');
};
