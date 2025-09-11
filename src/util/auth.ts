export const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};
