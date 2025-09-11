export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token)
}
