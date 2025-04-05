import { Route, Routes } from 'react-router'
import Profile from '../pages/Profile'
import TodoList from '../pages/TodoList'

const AppRoutes = () => {
    const navigationRoutes = [
        { path: '/todo', element: <TodoList></TodoList> },
        { path: '/profile', element: <Profile></Profile> },
    ]
    return (
        <Routes>
            {navigationRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default AppRoutes
