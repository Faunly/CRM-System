import { Button, Flex, Typography } from 'antd';
import { getProfileData } from '../api/user';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';

import { useNavigate } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { logoutUser } from '../api/auth';

const { Text, Title } = Typography;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const authStatus = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
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
      dispatch(authActions.authLogout());
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
        <Text>isAuth: {authStatus ? 'Авторизован' : 'Не авторизован'}</Text>
      </Flex>
      <Button onClick={logoutHandler}>Выйти</Button>
    </>
  );
};

export default Profile;
