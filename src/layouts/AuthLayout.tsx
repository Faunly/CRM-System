import { Outlet } from 'react-router';
import { Layout } from 'antd';

const AuthLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;
