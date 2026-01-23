import {
  Flex,
  Layout,
  Typography,
  Table,
  TableProps,
  Tag,
  Space,
  Button,
} from 'antd';
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
    // defaultSortOrder: 'ascend',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    // defaultSortOrder: 'ascend',
    sorter: true,
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
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: (isBlock) => <Text>{isBlock ? 'да' : 'нет'}</Text>,
    filterMultiple: false,
    filters: [
      {
        text: '+',
        value: true,
      },
      {
        text: '-',
        value: false,
      },
    ],
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
  {
    title: 'Действия',
    key: 'action',
    render: () => (
      <Space>
        <Button>Заблокировать</Button>
      </Space>
    ),
  },
];

const UsersPage = () => {
  const [usersData, setUsersData] = useState<ProfileDataType[]>([]);
  const [usersMeta, setUsersMeta] = useState<UsersMeta>();

  const [pageMeta, setPageMeta] = useState<{
    currentPage: number;
    currentLimit: number;
    isBlocked: boolean | null;
    sortField: string | null;
    sortOrder: string | null;
  }>({
    currentPage: 1,
    currentLimit: 10,
    isBlocked: null,
    sortField: null,
    sortOrder: null,
  });

  const loadDataHandler = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = {
        page: pageMeta.currentPage - 1,
        limit: pageMeta.currentLimit,
        sortOrder: pageMeta.sortOrder,
      };

      if (pageMeta.isBlocked) {
        params.isBlocked = pageMeta.isBlocked;
      }

      if (pageMeta.sortField) {
        params.sortBy = pageMeta.sortField;
      }

      const data = await getUsersData(params);
      setUsersData(data.data);
      setUsersMeta(data.meta);
    } catch (error) {
      console.error('Ошибка при загрузке: ', error);
    }
  };

  useEffect(() => {
    loadDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMeta.currentPage, pageMeta.currentLimit, pageMeta.isBlocked, pageMeta.sortField, pageMeta.sortOrder]);

  const onChangeTable: TableProps['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    const blockValueFilter = filters.isBlocked?.[0];
    const blockValueSortField = singleSorter.field;
    const sortOrderValue = singleSorter.order;

    setPageMeta({
      currentPage: pagination.current || 1,
      currentLimit: pagination.pageSize || 10,
      isBlocked:
        typeof blockValueFilter === 'boolean' ? blockValueFilter : null,
      sortField: blockValueSortField ? String(blockValueSortField) : null,
      sortOrder:
        sortOrderValue === 'ascend'
          ? 'asc'
          : sortOrderValue === 'descend'
            ? 'desc'
            : null,
    });
  };

  return (
    <Flex vertical style={{ maxWidth: '90%' }}>
      <Header style={{ backgroundColor: 'transparent', height: 'unset' }}>
        <Title>Пользователи</Title>
      </Header>
      <Content style={{ padding: '0 3rem' }}>
        <Table
          columns={columns}
          dataSource={usersData}
          onChange={onChangeTable}
          scroll={{ y: '80vh', x: '100ww' }}
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
