import { Button, Flex, Form, GetProps, Input, Layout, Typography } from 'antd';
import type { FormProps } from 'antd';
import Icon from '@ant-design/icons';
import SvgloginIcon from '../../assets/AuthPage/SvgLoginIcon';

import classes from './RegisterForm.module.css';
import { registerUser } from '../../api/auth';
import { AxiosError } from 'axios';
import React from 'react';

type CustomIconComponentProps = GetProps<typeof Icon>;

const AuthIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SvgloginIcon} {...props} />
);

type RegisterFormProps = {
  successMessage: () => void;
  errorMessage: (error: string) => void;
};

type FieldType = {
  username: string;
  login: string;
  password: string;
  confirm: string;
  email: string;
  phone?: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  successMessage,
  errorMessage,
}) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await registerUser(values);
      form.resetFields([
        'register',
        'username',
        'login',
        'password',
        'confirm',
        'email',
        'phone',
      ]);
      successMessage();
    } catch (error) {
      const axiosError = error as AxiosError<string>;

      if (axiosError.response?.data) {
        errorMessage(axiosError.response.data);
      } else {
        errorMessage('Произошла неизвестная ошибка');
      }
    }
  };
  return (
    <Layout style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <Flex className={classes.container} justify="center" align="center">
        <Flex vertical gap="1rem">
          <AuthIcon style={{ fontSize: '3.5rem' }} />
          <Flex vertical>
            <Typography.Title level={3} className="title">
              Зарегистрируйтесь Ваш аккаунт
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
              name="username"
              label="Имя пользователя"
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя пользователя!',
                },
                {
                  max: 60,
                  message: 'Максимальное кол-во символов: 60',
                },
                {
                  type: 'string',
                  pattern: new RegExp('^[a-zA-Zа-яА-ЯёЁ]+$'),
                  message: 'Текущий ввод не совпадает с именем пользователя!',
                },
              ]}
            >
              <Input className={classes.input} />
            </Form.Item>

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
                {
                  max: 60,
                  message: 'Максимальное кол-во символов: 60',
                },
                {
                  type: 'string',
                  pattern: new RegExp('^[a-zA-Z]*$'),
                  message: 'Текущий ввод не совпадает с логином!',
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
                {
                  max: 60,
                  message: 'Максимальное кол-во символов: 60',
                },
              ]}
            >
              <Input.Password className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType>
              name="confirm"
              label="Повторите пароль"
              dependencies={['password']}
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, повторите свой пароль!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароль не совпадает!'));
                  },
                }),
              ]}
            >
              <Input.Password className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType>
              name="email"
              label="Почтовый адрес"
              className={classes.formInput}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите почтовый адрес!',
                },
                {
                  type: 'email',
                  message: 'Текущий ввод не совпадает с почотвым адресом!',
                },
              ]}
            >
              <Input className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType>
              name="phone"
              label="Телефон"
              className={classes.formInput}
              rules={[
                {
                  pattern: new RegExp('^(?:\\+7|7|8)?\\d{10}$'),
                  message: 'Текущий ввод не совпадает с номером телефона!',
                },
              ]}
            >
              <Input className={classes.input} />
            </Form.Item>

            <Form.Item<FieldType> label={null}>
              <Button htmlType="submit" className={classes.button}>
                Зарегистрироваться
              </Button>
            </Form.Item>

            <Typography.Text>
              Уже зарегистрированы?{' '}
              <Typography.Link href="/login">
                Залогиниться в аккаунт
              </Typography.Link>
            </Typography.Text>
          </Form>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default RegisterForm;
