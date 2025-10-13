import { Button, Flex, Typography } from 'antd';
import { getProfileData, logoutUser } from '../api/user';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';
import { updateAccessToken } from '../api/auth';

import { useNavigate } from 'react-router';

const { Text, Title } = Typography;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
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
      navigate('/login');
    } catch {
      throw new Error('Ошибка завершения сессии!');
    }
  };

  const updateTokenHandler = () => {
    try {
      updateAccessToken();
    } catch {
      throw new Error('Ошибка обновления токена!');
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
      </Flex>
      <Button onClick={logoutHandler}>Выйти</Button>
      <Button onClick={updateTokenHandler}>обновить токен</Button>
    </>
  );
};

export default Profile;
