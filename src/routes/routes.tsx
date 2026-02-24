import { createBrowserRouter } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import AuthLayout from '../layouts/AuthLayout';

import { accessTokenLoader } from '../util/tokenManager';
import UsersPage from '../pages/UsersPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import ProtectedRoutes from '../util/ProtectedRoutes';

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
    element: <ProtectedRoutes />,
    loader: accessTokenLoader,
    children: [
      { index: true, element: <TodoList /> },
      { path: 'todo', element: <TodoList /> },
      { path: 'profile', element: <Profile /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserProfilePage /> },
    ],
  },
]);
