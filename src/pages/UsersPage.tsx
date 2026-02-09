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
  Popconfirm,
} from 'antd';
import { blockUser, deleteUser, getUsersData, unblockUser } from '../api/admin';
import { useEffect, useRef, useState } from 'react';
import { ProfileDataType, Role, UsersMeta } from '../types/profile';
import dayjs from 'dayjs';
type SearchProps = GetProps<typeof Input.Search>;
import type { MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useAuthActions } from '../store/hooks/useAuthActions';
import { selectIsFetching } from '../store/selectors/uiSelectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ColumnsType } from 'antd/es/table';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const UsersPage = () => {
  const [usersData, setUsersData] = useState<ProfileDataType[]>([]);
  const [usersMeta, setUsersMeta] = useState<UsersMeta>();

  const isFetching = useSelector(selectIsFetching);
  const { setIsFetching } = useAuthActions();

  const navigate = useNavigate();

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

  const onChangeTable: TableProps<ProfileDataType>['onChange'] = (
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

  const blockHandler = async (id: number) => {
    try {
      setIsFetching(true);
      await blockUser(id);
      loadDataHandler();
    } finally {
      setIsFetching(false);
    }
  };

  const unblockHandler = async (id: number) => {
    try {
      setIsFetching(true);
      await unblockUser(id);
      loadDataHandler();
    } finally {
      setIsFetching(false);
    }
  };

  const deleteHandler = async (id: number) => {
    try {
      setIsFetching(true);
      await deleteUser(id);
      loadDataHandler();
    } finally {
      setIsFetching(false);
    }
  };

  const editHandler = (record: ProfileDataType) => {
    console.log('Редактировать', record);
    navigate('/user', { state: record });
  };

  const columns: ColumnsType<ProfileDataType> = [
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      fixed: true,
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
      render: (_, record) => {
        const items: MenuProps['items'] = [
          record.isBlocked
            ? {
                label: 'Разблокировать',
                key: 'unblock',
                onClick: () => unblockHandler(record.id),
                disabled: isFetching,
              }
            : {
                label: (
                  <Popconfirm
                    title="Заблокировать пользователя?"
                    onConfirm={() => blockHandler(record.id)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <div
                      style={{ width: '100%' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Заблокировать
                    </div>
                  </Popconfirm>
                ),
                key: 'block',
                danger: true,
                disabled: isFetching,
              },
          {
            label: 'Изменить роли',
            key: 'roles',
          },
          {
            label: (
              <Popconfirm
                title="Удалить пользователя?"
                onConfirm={() => deleteHandler(record.id)}
                okText="Да"
                cancelText="Нет"
              >
                <div
                  style={{ width: '100%' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Удалить
                </div>
              </Popconfirm>
            ),
            key: 'delete',
            danger: true,
          },
        ];

        return (
          <Space>
            <Button onClick={() => editHandler(record)}>Ред</Button>
            <Dropdown menu={{ items }}>
              <Button icon={<EllipsisOutlined />} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

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
          rowKey="id"
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
