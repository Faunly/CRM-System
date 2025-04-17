import { RouteObject, useRoutes } from 'react-router-dom'
import Profile from '../pages/Profile'
import TodoList from '../pages/TodoList'
import { Navigate } from 'react-router'

const routesConfig: RouteObject[] = [
    { path: '/', element: <Navigate to="/todo" replace /> },
    { path: '/todo', element: <TodoList /> },
    { path: '/profile', element: <Profile /> },
]

const AppRoutes = () => {
    const routes = useRoutes(routesConfig)
    return routes
}

export default AppRoutes
