import { Flex, Typography } from 'antd';
import { useLocation } from 'react-router';

const { Text } = Typography;

export const UserProfilePage = () => {
  const location = useLocation();
  const profileData = location.state;

  if (!profileData) {
    return <Text>Данные не найдены. Вернитесь в список пользователей.</Text>;
  }

  return (
    <>
      <Flex vertical>
        <Text>Профиль пользователя: {profileData?.username}</Text>
        <Text>Почта: {profileData?.email}</Text>
        <Text>Телефон: {profileData?.phoneNumber || 'Нет'}</Text>
        <Text>Роли: {Array(profileData.roles).join()}</Text>
      </Flex>
    </>
  );
};
