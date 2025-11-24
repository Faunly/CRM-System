import { createBrowserRouter, redirect } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import { accessTokenLoader } from '../util/refreshTokenManager';
import { selectIsAuth } from '../store/selectors/uiSelectors';
import store from '../store';

const checkAuthLoader = () => {
  const isAuth = selectIsAuth(store.getState());
  if (!isAuth) {
    return redirect('/auth/login');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <AuthPage /> },
      { path: 'register', element: <AuthPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    loader: accessTokenLoader,
    children: [
      { index: true, element: <TodoList /> },
      { path: 'profile', element: <Profile />, loader: checkAuthLoader },
      { path: 'todo', element: <TodoList /> },
    ],
  },
]);
