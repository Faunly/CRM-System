import {
  Button,
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
import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuthActions } from '../../store/hooks/useAuthActions';
import { selectIsFetching } from '../../store/selectors/authSelectors';
import { NoticeType } from 'antd/es/message/interface';

type CustomIconComponentProps = GetProps<typeof Icon>;

type LoginFormProps = {
  showMessage: (type: NoticeType, content: string) => void;
};

const AuthIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SvgloginIcon} {...props} />
);

type FieldType = {
  login: string;
  password: string;
  remember?: string;
};

const MIN_LENGHT_LOGIN = 2;
const MIN_LENGHT_PASS = 6;

const LoginForm: React.FC<LoginFormProps> = ({ showMessage }) => {
  const [form] = Form.useForm();
  const { setIsAuth, setIsFetching } = useAuthActions();
  const navigate = useNavigate();

  const isFetching = useSelector(selectIsFetching);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsFetching(true);
      await loginUser(values);
      form.resetFields(['login', 'password', 'remember']);
      console.log('login success');
      showMessage('success', 'Вы успешно авторизовались!');
      setIsAuth(true);
      navigate('/todo');
    } catch (error) {
      const axiosError = error as AxiosError<string>;

      if (axiosError.response?.data) {
        showMessage('error', `Произошла ошибка: ${axiosError.response.data}`);
      } else {
        showMessage('error', 'Произошла неизвестная ошибка');
      }
    } finally {
      setIsFetching(false);
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
            disabled={isFetching}
          >
            <Form.Item<FieldType>
              name="login"
              label="Логин"
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите логин!',
                },
                {
                  min: MIN_LENGHT_LOGIN,
                  message: `Минимальное кол-во символов: ${MIN_LENGHT_LOGIN}`,
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
                  min: MIN_LENGHT_PASS,
                  message: `Минимальное кол-во символов: ${MIN_LENGHT_PASS}`,
                },
              ]}
            >
              <Input.Password className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType> label={null}>
              <Button htmlType="submit" className={classes.button}>
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
