import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, UserOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const App = () => {
  const [siderItem, setSiderItem] = useState('todo');

  const navigate = useNavigate();
  const location = useLocation();

  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

  }, [token]);

  const itemsSider: MenuItem[] = [
    {
      key: 'todo',
      icon: <ContainerOutlined />,
      label: 'Todo-List',
      onClick: () => navigate('/todo'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Sider theme="light">
          <Menu
            items={itemsSider}
            mode="inline"
            defaultSelectedKeys={[`${siderItem}`]}
            onSelect={(key) => {
              setSiderItem(key.key);
            }}
          ></Menu>
        </Sider>
      )}
      <Outlet />
    </Layout>
  );
};

export default App;
