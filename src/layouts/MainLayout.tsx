import { Outlet, useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  ContainerOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';
import { getProfileData } from '../api/user';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);

  useEffect(() => {
    getProfileDataHandler();
  }, []);

  const getProfileDataHandler = async () => {
    try {
      const data = await getProfileData();
      setProfileData(data);
    } catch {
      throw new Error('Ошибка получения данных!');
    }
  };

  const isAdmin =
    profileData?.roles.includes('ADMIN') ||
    profileData?.roles.includes('MODERATOR');

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
