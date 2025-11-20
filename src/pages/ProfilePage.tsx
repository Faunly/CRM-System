import { Button, Flex, Typography } from 'antd';
import { getProfileData, logoutUser } from '../api/user';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';

import { useNavigate } from 'react-router';
import { useUIActions } from '../store/hooks/useUIActions';

const { Text, Title } = Typography;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const { setIsAuth } = useUIActions();
  const navigate = useNavigate();

  const getProfileDataHandler = async () => {
    try {
      const data = await getProfileData();
      setProfileData(data);
    } catch {
      throw new Error('Ошибка получения данных!');
    }
  };

  const logoutHandler = () => {
    try {
      logoutUser();
      setIsAuth(false);
      navigate('/login');
    } catch {
      throw new Error('Ошибка завершения сессии!');
    }
  };

  useEffect(() => {
    getProfileDataHandler();
  }, []);

  return (
    <>
      <Flex vertical>
        <Title>Профиль пользователя {profileData?.username}</Title>
        <Text>Почта: {profileData?.email}</Text>
        <Text>Телефон: {profileData?.phoneNumber || 'Нет'}</Text>
        <Button onClick={logoutHandler}>Выйти</Button>
      </Flex>
    </>
  );
};

export default Profile;
