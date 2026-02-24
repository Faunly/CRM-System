import MainLayout from '../layouts/MainLayout';
import { Navigate } from 'react-router';
import { useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsInit } from '../store/selectors/authSelectors';
import { useEffect } from 'react';
import { initializeApp } from '../store/hooks/useAuthActions';

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isInit = useSelector(selectIsInit);
  console.log('isAuth: ', isAuth);
  console.log('isInit: ', isInit);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInit) {
    return;
  }

  return isAuth ? <MainLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
