import { Flex, Image, message } from 'antd';

import backgroundImage from '../assets/AuthPage/background.png';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { useLocation } from 'react-router';
import { NoticeType } from 'antd/es/message/interface';

const AuthPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();

  const showMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
      duration: 5,
    });
  };

  return (
    <Flex style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
      {contextHolder}
      <Image src={backgroundImage} preview={false} height={'100vh'} />
      {location.pathname === '/login' ? (
        <LoginForm showMessage={showMessage} />
      ) : (
        <RegisterForm showMessage={showMessage} />
      )}
    </Flex>
  );
};

export default AuthPage;
