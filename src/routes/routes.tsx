import { RouteObject, useRoutes } from 'react-router-dom'
import { Navigate } from 'react-router'

import Profile from '../pages/ProfilePage'
import TodoList from '../pages/TodoListPage'
import AuthPage from '../pages/AuthPage'

const routesConfig: RouteObject[] = [
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/todo', element: <TodoList /> },
    { path: '/profile', element: <Profile /> },
    { path: '/login', element: <AuthPage /> },
    { path: '/register', element: <AuthPage /> },
]

const AppRoutes = () => {
    return useRoutes(routesConfig)
}

export default AppRoutes
