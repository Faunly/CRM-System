import {Flex, Image} from 'antd';

import backgroundImage from '../assets/LoginPage/background.png';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from "../components/LoginForm/LoginForm.tsx";

const LoginPage = () => {
    return (
        <Flex style={{backgroundColor: "#FFFFFF", width: "100%"}}>
            <Image src={backgroundImage} preview={false} height={'100vh'}/>
            {/*<RegisterForm/>*/}
            <LoginForm/>
        </Flex>
    );
};

export default LoginPage;
