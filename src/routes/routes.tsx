import { createBrowserRouter, redirect } from 'react-router';

import Profile from '../pages/ProfilePage';
import TodoList from '../pages/TodoListPage';
import AuthPage from '../pages/AuthPage';
import AuthLayout from '../layouts/AuthLayout';

import UsersPage from '../pages/UsersPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import ProtectedRoutes from '../util/ProtectedRoutes';
import store from '../store';
import { initializeApp } from '../store/hooks/useAuthActions';
import MainLayout from '../layouts/MainLayout';
import AdminRoute from '../util/AdminRoute';

export const protectedLoader = async () => {
  if (!localStorage.getItem('isLoggedIn')) {
    throw redirect('/login');
  }

  let state = store.getState();
  if (!state.auth.isInit) {
    await store.dispatch(initializeApp());
    state = store.getState();
  }

  if (!state.auth.isAuth) {
    console.log('User is not authenticated in Redux');
    throw redirect('/login');
  }

  return null;
};

export const adminLoader = async () => {
  const state = store.getState();

  if (!state.auth.isAdmin) {
    throw redirect('/todo');
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
    element: <MainLayout />,
    loader: protectedLoader,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <TodoList /> },
          { path: 'todo', element: <TodoList /> },
          { path: 'profile', element: <Profile /> },
          {
            element: <AdminRoute />,
            loader: adminLoader,
            children: [
              { path: 'users', element: <UsersPage /> },
              { path: 'users/:id', element: <UserProfilePage /> },
            ],
          },
        ],
      },
    ],
  },
]);
