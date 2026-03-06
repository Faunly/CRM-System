import { Button, Flex, Form, Input, message, Space, Typography } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { updateUserData } from '../api/admin';
import { NoticeType } from 'antd/es/message/interface';
import { AxiosError } from 'axios';

const { Title, Text } = Typography;

type FieldType = {
  username: string;
  email: string;
  phoneNumber: string;
};

export const UserProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const profileData = location.state;
  const [profileData, setProfileData] = useState(location.state);

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
      duration: 5,
    });
  };
  const [loading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  if (!profileData) {
    return <Text>Данные не найдены. Вернитесь в список пользователей.</Text>;
  }

  const handleCancel = () => {
    form.resetFields();
    setIsEdit(false);
  };

  const handleSave = async (values) => {
    try {
      setIsLoading(true);
      const response = await updateUserData(profileData.id, values);
      setProfileData(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<string>;

      if (axiosError.response?.data) {
        showMessage('error', `Произошла ошибка: ${axiosError.response.data}`);
      } else {
        showMessage('error', 'Произошла неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  return (
    <Flex vertical style={{ padding: '1rem' }}>
      {contextHolder}
      <Title>Профиль пользователя: id({profileData?.id})</Title>

      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Вернуться к таблице
      </Button>

      <Form
        form={form}
        name="userData"
        layout="vertical"
        autoComplete="off"
        initialValues={profileData}
        onFinish={handleSave}
        disabled={loading}
      >
        <Form.Item<FieldType>
          name="username"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя пользователя!',
            },
          ]}
        >
          {isEdit ? <Input /> : <Text>{profileData.username}</Text>}
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          label="Почта"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите почту!',
            },
          ]}
        >
          {isEdit ? <Input /> : <Text>{profileData.email}</Text>}
        </Form.Item>

        <Form.Item<FieldType> name="phoneNumber" label="Телефон">
          {isEdit ? <Input /> : <Text>{profileData.phoneNumber}</Text>}
        </Form.Item>

        <Form.Item>
          {isEdit ? (
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button onClick={handleCancel}>Отмена</Button>
            </Space>
          ) : (
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Редактировать
            </Button>
          )}
        </Form.Item>
      </Form>
    </Flex>
  );
};
