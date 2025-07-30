import { Flex, Image } from 'antd';

import backgroundImage from '../assets/LoginPage/background.png';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { useLocation } from 'react-router';

const LoginPage = () => {
    const location = useLocation();

    return (
        <Flex style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
            <Image src={backgroundImage} preview={false} height={'100vh'} />
            {location.pathname === '/login' ? <LoginForm /> : <RegisterForm />}
        </Flex>
    );
};

export default LoginPage;
