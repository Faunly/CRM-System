import { createBrowserRouter } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import App from '../App';

import { checkAuthLoader, tokenLoader } from '../util/auth';

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <App />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <TodoList />,
        loader: checkAuthLoader,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: checkAuthLoader,
      },
      {
        path: 'todo',
        element: <TodoList />,
        loader: checkAuthLoader,
      },
    ],
  },
]);
