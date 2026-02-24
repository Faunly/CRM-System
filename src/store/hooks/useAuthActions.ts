import { useDispatch } from 'react-redux';
import { authActions } from '../slices/auth-slice';
import { updateAccessToken } from '../../api/auth';
import { AppDispatch } from '..';

export const initializeApp = () => async (dispatch: AppDispatch) => {
  try {
    await updateAccessToken();
    dispatch(authActions.setIsAuth(true));
  } catch {
    dispatch(authActions.setIsAuth(false));
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
