import { redirect } from 'react-router';

export const getAccessTokenDuration = () => {
  
}

export const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  return token;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token)
}

export const cleanTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    console.log('token undefined! Return to login page');
    return redirect('/login');
  }
  console.log('token exists!');
};
