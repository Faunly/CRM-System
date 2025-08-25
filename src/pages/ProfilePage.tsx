import { Button, Flex, Typography } from 'antd';
import { getProfileData } from '../api/user';

const { Text } = Typography;

const Profile = () => {
  const getProfileDataHandler = () => {
    getProfileData();
  };

  return (
    <>
      <Flex vertical>
        <Text>Привет!!!</Text>
        <Button onClick={getProfileDataHandler}>Get profile data</Button>
      </Flex>
    </>
  );
};

export default Profile;
