import { Button, Flex, Typography } from 'antd';
import { getProfileData, logoutUser } from '../api/user';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';
import { updateAccessToken } from '../api/auth';

import { useNavigate } from 'react-router';
import { getTokenDuration } from '../util/tokens';

// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store/auth-slice';

const { Text, Title } = Typography;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  // const authStatus = useSelector((state) => state.auth.isAuth);

  // const dispatch = useDispatch();
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
      // dispatch(authActions.authLogout());
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
        {/* <Text>isAuth: {authStatus ? 'Авторизован' : 'Не авторизован'}</Text> */}
      </Flex>
      <Button onClick={logoutHandler}>Выйти</Button>
      <Button onClick={updateTokenHandler}>обновить токен</Button>
      <Button
        onClick={() => {
          console.log(getTokenDuration('accessTokenExpiration'));
        }}
      >
        время access токена 
      </Button>
            <Button
        onClick={() => {
          console.log(getTokenDuration('refreshTokenExpiration'));
        }}
      >
        время refresh токена 
      </Button>
      
    </>
  );
};

export default Profile;
