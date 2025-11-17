import { Flex, Image, message, Modal } from 'antd';

import backgroundImage from '../assets/AuthPage/background.png';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { useLocation } from 'react-router';

const AuthPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();

  const errorMessage = (error: string) => {
    messageApi.open({
      type: 'error',
      content: `Произошла ошибка: ${error}`,
      duration: 5,
    });
  };

  return (
    <Flex style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
      {contextHolder}
      <Image src={backgroundImage} preview={false} height={'100vh'} />
      {location.pathname === '/login' ? (
        <LoginForm
          errorMessage={errorMessage}
        />
      ) : (
        <RegisterForm
          errorMessage={errorMessage}
        />
      )}
    </Flex>
  );
};

export default AuthPage;
