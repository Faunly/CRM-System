import { Outlet, useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  ContainerOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import store from '../store';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = store.getState().auth.isAdmin;

  const itemsSider: MenuItem[] = [
    {
      key: '/todo',
      icon: <ContainerOutlined />,
      label: 'Todo-List',
      onClick: () => navigate('/todo'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile'),
    },
    ...(isAdmin
      ? [
          {
            key: '/users',
            icon: <UsergroupAddOutlined />,
            label: 'Пользователи',
            onClick: () => navigate('/users'),
          },
        ]
      : []),
  ];

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      <Sider theme="light" style={{ maxWidth: '10%' }}>
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
