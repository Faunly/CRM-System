import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, UserOutlined } from '@ant-design/icons';

import { selectIsAuth } from '../store/selectors/uiSelectors';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const itemsSider: MenuItem[] = [
    {
      key: '/todo',
      icon: <ContainerOutlined />,
      label: 'Todo-List',
      onClick: () => {
        navigate('/todo');
        console.log(location.pathname);
      },
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile'),
    },
  ];

  if (!selectIsAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      <Sider theme="light">
        <Menu
          items={itemsSider}
          mode="inline"
          selectedKeys={[location.pathname]}
        ></Menu>
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
