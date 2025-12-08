import { Flex, Layout, Typography, Table, TableProps, Tag } from 'antd';
import { getUsersData } from '../api/admin';
import { useEffect, useState } from 'react';
import { ProfileDataType, Role } from '../types/profile';
import dayjs from 'dayjs';
import { current } from '@reduxjs/toolkit';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const columns: TableProps['columns'] = [
  {
    title: 'Имя',
    dataIndex: 'username',
    key: 'username',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.username.length - b.username.length,
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
  const [pageMeta, setPageMeta] = useState<{
    currentPage?: number;
    currentLimit?: number;
  }>({
    currentPage: 1,
    currentLimit: 10,
  });

  const getUsersDataHandler = async () => {
    const data = await getUsersData(pageMeta);
    setUsersData(data);
    console.log(data);
  };

  const onChangeTable: TableProps['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log('params', pagination, filters, sorter, extra);
    setPageMeta({
      currentPage: pagination.current,
      currentLimit: pagination.total,
    });
  };

  useEffect(() => {
    getUsersDataHandler();
  }, []);

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
          // pagination={{ total: 20 }}
        />
      </Content>
    </Flex>
  );
};

export default UsersPage;
