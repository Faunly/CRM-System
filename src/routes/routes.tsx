import { createBrowserRouter } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import { accessTokenLoader } from '../util/tokenManager';
import UsersPage from '../pages/UsersPage';

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
      { path: 'todo', element: <TodoList /> },
      { path: 'profile', element: <Profile /> },
      { path: 'users', element: <UsersPage />}
    ],
  },
]);
