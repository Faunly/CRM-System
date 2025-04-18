import { RouteObject, useRoutes } from 'react-router-dom'
import Profile from '../pages/ProfilePage'
import TodoList from '../pages/TodoListPage'
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
