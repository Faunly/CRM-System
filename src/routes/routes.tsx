import { createBrowserRouter, redirect } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import App from '../App';

import { accessTokenLoader } from '../util/refreshTokenManager';
import { selectIsAuth } from '../store/selectors/uiSelectors';
import store from '../store';

const checkAuthLoader = () => {
  const isAuth = selectIsAuth(store.getState());
  if (!isAuth) {
    return redirect('/login');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <AuthPage />,
  },
  {
    path: 'register',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <App />,
    loader: accessTokenLoader,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: checkAuthLoader,
      },
      {
        path: 'todo',
        element: <TodoList />,
      },
    ],
  },
]);
