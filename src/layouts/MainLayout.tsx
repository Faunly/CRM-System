import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ContainerOutlined, UserOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const MainLayout = () => {
  const [siderItem, setSiderItem] = useState('todo');

  const navigate = useNavigate();

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
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
