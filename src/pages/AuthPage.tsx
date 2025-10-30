import { Flex, Image, message } from 'antd';

import backgroundImage from '../assets/AuthPage/background.png';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { useLocation } from 'react-router';

const AuthPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();

  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Вы успешно зарегистрировались!',
      duration: 30,
    });
  };

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
          // successMessage={successMessage}
          errorMessage={errorMessage}
        />
      ) : (
        <RegisterForm
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      )}
    </Flex>
  );
};

export default AuthPage;
