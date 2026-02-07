import {
  Flex,
  Layout,
  Typography,
  Table,
  TableProps,
  Tag,
  Space,
  Button,
  Input,
  GetProps,
  Dropdown,
} from 'antd';
import { getUsersData } from '../api/admin';
import { useEffect, useRef, useState } from 'react';
import { ProfileDataType, Role, UsersMeta } from '../types/profile';
import dayjs from 'dayjs';
type SearchProps = GetProps<typeof Input.Search>;
import type { MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Переход на страницу пользователя', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  switch (e.key) {
    case 'block':
      console.log(1);
      break;

    default:
      console.log("err");
  }
};

// const handleBlockUser = async () => {
//   try {
//     const response = await blockUser(id)
//   } catch (error) {
    
//   }
// }

const items: MenuProps['items'] = [
  {
    label: 'За(раз)блокировать',
    key: 'block',
  },
  {
    label: 'Изменить роли',
    key: 'roles',
  },
  {
    label: 'Удалить',
    key: 'delete',
    danger: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const columns: TableProps['columns'] = [
  {
    title: 'Имя',
    dataIndex: 'username',
    key: 'username',
    sorter: true,
    fixed: true,
    render: (name) => {<a onClick={() => console.log(name)}>name</a>}
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
    title: 'Заблокирован?',
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: (isBlocked) => <Text>{isBlocked ? 'да' : 'нет'}</Text>,
    filterMultiple: false,
    filters: [
      {
        text: 'Заблокированые',
        value: true,
      },
      {
        text: 'Разблокированые',
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
    key: 'actions',
    render: () => (
      <Space>
        <Button onClick={handleButtonClick}>Редактировать</Button>
        <Dropdown menu={menuProps}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
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
    searchQuery: string | null;
  }>({
    currentPage: 1,
    currentLimit: 10,
    isBlocked: null,
    sortField: null,
    sortOrder: null,
    searchQuery: null,
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

      if (pageMeta.searchQuery) {
        params.search = pageMeta.searchQuery;
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
  }, [
    pageMeta.currentPage,
    pageMeta.currentLimit,
    pageMeta.isBlocked,
    pageMeta.sortField,
    pageMeta.sortOrder,
    pageMeta.searchQuery,
  ]);

  const onChangeTable: TableProps['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    const blockValueFilter = filters.isBlocked?.[0];
    const blockValueSortField = singleSorter.field;
    const sortOrderValue = singleSorter.order;

    setPageMeta((prev) => ({
      ...prev,
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
    }));
  };

  const timerRef = useRef<number | null>(null);

  const searchHandler: SearchProps['onChange'] = (e) => {
    const value = e.target.value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setPageMeta((prev) => ({
        ...prev,
        searchQuery: value,
      }));

      timerRef.current = null;
    }, 1000);
  };

  return (
    <Flex vertical style={{ maxWidth: '90%' }}>
      <Header style={{ backgroundColor: 'transparent', height: 'unset' }}>
        <Title>Пользователи</Title>
      </Header>

      <Content style={{ padding: '0 3rem' }}>
        <Flex justify="end">
          <Input
            placeholder="Поиск по имени или почте..."
            style={{ width: 200 }}
            onChange={searchHandler}
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={usersData}
          onChange={onChangeTable}
          scroll={{ y: '75vh', x: '100ww' }}
          size="middle"
          pagination={
            (usersMeta?.totalAmount ?? 0) > 20
              ? {
                  total: usersMeta?.totalAmount,
                  current: pageMeta.currentPage,
                  pageSize: pageMeta.currentLimit,
                }
              : false
          }
        />
      </Content>
    </Flex>
  );
};

export default UsersPage;
