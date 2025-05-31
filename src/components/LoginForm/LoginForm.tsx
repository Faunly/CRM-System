import {Button, Checkbox, Flex, Form, GetProps, Input, Layout, Typography} from 'antd';
// import type { FormProps } from 'antd';
import Icon from '@ant-design/icons';
import SvgloginIcon from '../../assets/LoginPage/SvgLoginIcon';

type CustomIconComponentProps = GetProps<typeof Icon>;

const LoginIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SvgloginIcon} {...props} />;

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const LoginForm = () => {
    const [form] = Form.useForm();

    return (
        <Layout style={{fontFamily: "'Nunito Sans', sans-serif"}}>
            <Flex style={{height: "100vh", backgroundColor: "#FFFFFF"}} justify="center" align="center">
                <Flex vertical gap="2rem">
                    <LoginIcon style={{fontSize: '4.5rem'}}/>
                    <Flex vertical>
                        <Typography.Title
                            level={2}
                            style={{
                                fontWeight: "700",
                                fontFamily: "'Nunito Sans', sans-serif",
                                margin: "0 0 0 1.5rem"
                            }}>
                            Login to your Account
                        </Typography.Title>
                        <Typography.Text style={{color: "#525252", marginLeft: "1.5rem"}}>See what is going on with your
                            business</Typography.Text>
                    </Flex>
                    <Form
                        form={form}
                        name="form-login"
                        layout="vertical"

                        initialValues={{remember: true}}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off">

                        <Form.Item<FieldType>
                            name="email"
                            label="Email"
                            style={{color: "#525252", margin: "0 0 1.5rem 0"}}
                            rules={[{required: true, message: 'Please, enter your username!'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            label="Password"
                            style={{color: "#525252", margin: 0}}
                            rules={[{required: true, message: 'Please, enter your password!'}]}>
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item<FieldType> label={null}>
                            <Button htmlType="submit"
                                    style={{
                                        width: "100%",
                                        color: "#FFFFFF",
                                        backgroundColor: "#7F265B",
                                        padding: "1.5rem 0",
                                        fontWeight: '800'
                                    }}>Login</Button>
                        </Form.Item>
                        <Typography.Text>Not Registered Yet? <Typography.Link href="/register">Create an
                            account</Typography.Link></Typography.Text>
                    </Form>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default LoginForm;
