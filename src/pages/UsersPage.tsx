import { Flex, Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const UsersPage = () => {
  return (
    <Flex vertical style={{ width: '100%' }}>
      <Header style={{ backgroundColor: 'transparent', height: 'unset' }}>
        <Title>Пользователи</Title>
      </Header>
      <Content>
        
      </Content>
    </Flex>
  );
};

export default UsersPage;
