import { useDispatch } from 'react-redux';
import { authActions } from '../slices/auth-slice';

export const useAuthActions = () => {
  const dispatch = useDispatch();

  return {
    setIsAuth: (value: boolean) => dispatch(authActions.setIsAuth(value)),
    setIsFetching: (value: boolean) =>
      dispatch(authActions.setIsFetching(value)),
  };
};
