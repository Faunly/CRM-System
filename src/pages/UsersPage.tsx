import { Flex, Layout, Typography, Table, TableProps, Tag } from 'antd';
import { getUsersData } from '../api/admin';
import { useEffect, useState } from 'react';
import { ProfileDataType, Role, UsersMeta } from '../types/profile';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const columns: TableProps['columns'] = [
  {
    title: 'Имя',
    dataIndex: 'username',
    key: 'username',
    sorter: (a, b) => a.username.localeCompare(b.username, 'en'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Роли',
    dataIndex: 'roles',
    key: 'roles',
    render: (_, { roles }) => (
      <Flex gap="small" align="center" wrap>
        {roles.map((role: Role) => {
          let color = 'green';
          if (role === 'HUILA') {
            color = 'volcano';
          }
          if (role === 'ADMIN') {
            color = 'yellow';
          }
          if (role === 'MODERATOR') {
            color = 'blue';
          }
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: 'Блокировка',
    dataIndex: 'isBlock',
    key: 'isBlock',
    render: (_, { isBlock }) => <Text>{isBlock ? '+' : '-'}</Text>,
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'date',
    key: 'date',
    render: (date) => {
      if (date) {
        return dayjs(date).format('DD.MM.YYYY');
      }
    },
  },
];

const UsersPage = () => {
  const [usersData, setUsersData] = useState<ProfileDataType[]>([]);
  const [usersMeta, setUsersMeta] = useState<UsersMeta>();

  const [pageMeta, setPageMeta] = useState({
    currentPage: 1,
    currentLimit: 10,
  });

  const loadDataHandler = async () => {
    try {
      const data = await getUsersData(pageMeta);
      setUsersData(data.data);
      setUsersMeta(data.meta);
    } catch (error) {
      console.error('Ошибка при загрузке: ', error);
    }
  };

  useEffect(() => {
    loadDataHandler();
  }, [pageMeta.currentPage, pageMeta.currentLimit]);

  const onChangeTable: TableProps['onChange'] = (pagination) => {
    setPageMeta({
      currentPage: pagination.current || 1,
      currentLimit: pagination.pageSize || 10,
    });
  };

  return (
    <Flex vertical style={{ width: '100%' }}>
      <Header style={{ backgroundColor: 'transparent', height: 'unset' }}>
        <Title>Пользователи</Title>
      </Header>
      <Content style={{ padding: '0 3rem' }}>
        <Table
          columns={columns}
          dataSource={usersData}
          onChange={onChangeTable}
          scroll={{ y: '40vw' }}
          size="middle"
          pagination={{
            total: usersMeta?.totalAmount,
            current: pageMeta.currentPage,
            pageSize: pageMeta.currentLimit,
          }}
        />
      </Content>
    </Flex>
  );
};

export default UsersPage;
