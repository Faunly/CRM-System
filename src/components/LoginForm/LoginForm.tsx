import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  GetProps,
  Input,
  Layout,
  Typography,
} from 'antd';
import Icon from '@ant-design/icons';
import SvgloginIcon from '../../assets/AuthPage/SvgLoginIcon';
import classes from './LoginForm.module.css';
import { AxiosError } from 'axios';
import { LoginUser } from '../../api/auth';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store';

type CustomIconComponentProps = GetProps<typeof Icon>;

type LoginFormProps = {
  errorMessage: (error: string) => void;
};

const AuthIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SvgloginIcon} {...props} />
);

type FieldType = {
  login: string;
  password: string;
  remember?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  // successMessage,
  errorMessage,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFetching = useSelector((state: RootState) => state.ui.isFetching); // FIXME

  const setIsFetchingHandler = (state: boolean) => {
    dispatch(uiActions.setIsFetching(state));
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsFetchingHandler(true);
      await LoginUser(values);
      form.resetFields(['login', 'password', 'remember']);
      // successMessage();
      console.log('login success');
      navigate('/todo');
    } catch (error) {
      const axiosError = error as AxiosError<string>;

      if (axiosError.response?.data) {
        errorMessage(axiosError.response.data);
      } else {
        errorMessage('Произошла неизвестная ошибка');
      }
    } finally {
      setIsFetchingHandler(false);
    }
  };
  return (
    <Layout style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Flex className={classes.container} justify="center" align="center">
        <Flex vertical gap="1rem">
          <AuthIcon style={{ fontSize: '3.5rem' }} />
          <Flex vertical>
            <Typography.Title level={3} className="title">
              Войдите в свой аккаунт
            </Typography.Title>
            <Typography.Text className={classes.text}>
              Посмотрите, что происходит с вашим бизнесом
            </Typography.Text>
          </Flex>
          <Form
            form={form}
            name="register"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="login"
              label="Логин"
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  min: 2,
                  message: 'Пожалуйста, введите логин!',
                },
              ]}
            >
              <Input className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              label="Пароль"
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите пароль!',
                },
                {
                  min: 6,
                  message: 'Минимальное кол-во символов: 6',
                },
              ]}
            >
              <Input.Password className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item<FieldType> label={null}>
              <Button
                htmlType="submit"
                className={classes.button}
                disabled={isFetching}
              >
                Войти
              </Button>
            </Form.Item>

            <Typography.Text>
              Не зарегистрированы?{' '}
              <Typography.Link href="/register">
                Зарегистрировать аккаунт
              </Typography.Link>
            </Typography.Text>
          </Form>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default LoginForm;
