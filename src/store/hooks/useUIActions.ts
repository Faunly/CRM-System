import { useDispatch } from 'react-redux';
import { uiActions } from '../slices/ui-slice';

export const useUIActions = () => {
  const dispatch = useDispatch();

  return {
    setIsAuth: (value: boolean) => dispatch(uiActions.setIsAuth(value)),
    setIsFetching: (value: boolean) => dispatch(uiActions.setIsFetching(value)),
  };
};
