import { Flex, Typography } from 'antd';
import { getProfileData } from '../api/user';
import { useEffect, useState } from 'react';
import { ProfileDataType } from '../types/profile';

const { Text, Title } = Typography;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);

  const getProfileDataHandler = async () => {
    try {
      const data = await getProfileData();
      setProfileData(data);
      // console.log(data);
    } catch {
      throw new Error('Ошибка получения данных!');
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
    </>
  );
};

export default Profile;
