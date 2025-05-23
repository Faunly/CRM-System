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
]

const AppRoutes = () => {
    const routes = useRoutes(routesConfig)
    return routes
}

export default AppRoutes
