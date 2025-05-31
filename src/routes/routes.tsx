import { RouteObject, useRoutes } from 'react-router-dom'
import { Navigate } from 'react-router'

import Profile from '../pages/ProfilePage'
import TodoList from '../pages/TodoListPage'
import LoginPage from '../pages/LoginPage'

const routesConfig: RouteObject[] = [
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/todo', element: <TodoList /> },
    { path: '/profile', element: <Profile /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <LoginPage /> },
]

const AppRoutes = () => {
    return useRoutes(routesConfig)
}

export default AppRoutes
