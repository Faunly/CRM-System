import { useDispatch } from 'react-redux';
import { authActions } from '../slices/auth-slice';
import { AppDispatch } from '..';
import { getProfileData } from '../../api/user';

export const initializeApp = () => async (dispatch: AppDispatch) => {
  try {
    const user = await getProfileData();

    const roles = user?.roles || [];
    const isAdmin = roles.includes('ADMIN') || roles.includes('MODERATOR');

    dispatch(authActions.setIsAdmin(isAdmin));
    dispatch(authActions.setIsAuth(true));
  } catch {
    dispatch(authActions.setIsAuth(false));
    dispatch(authActions.setIsAdmin(false));
  } finally {
    dispatch(authActions.setIsInit(true));
  }
};

export const useAuthActions = () => {
  const dispatch = useDispatch();

  return {
    setIsAuth: (value: boolean) => dispatch(authActions.setIsAuth(value)),
    setIsFetching: (value: boolean) =>
      dispatch(authActions.setIsFetching(value)),
    setIsInit: (value: boolean) => dispatch(authActions.setIsInit(value)),
  };
};
