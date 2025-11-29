import { Outlet, useNavigate } from 'react-router';

const ProtectedRoute = (isAuth: boolean) => {
  const navigate = useNavigate();
  return isAuth ? <Outlet /> : navigate('/login');
};

export default ProtectedRoute;
