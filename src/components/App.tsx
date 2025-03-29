import { useCallback, useEffect, useState } from 'react'
import { getTasksByCategory } from '../api/http.js'
import { Tabs, Flex, Layout, Menu } from 'antd'
import { ContainerOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]
const { Header, Sider, Content } = Layout

import AddTask from '../components/AddTask/AddTask.tsx'
import TaskList from '../components/TaskList/TaskList.tsx'
import { CategoriesType, TasksType } from '../types/todolist.ts'
import { filterTypes } from '../types/filter'
import Profile from '../pages/Profile.tsx'

const App = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [infoTasks, setInfoTasks] = useState<CategoriesType>()
    const [isFetching, setIsFetching] = useState(true)
    const [filter, setFilter] = useState<filterTypes>('all')
    const [siderItem, setSiderItem] = useState('todo')

    const itemsSider: MenuItem[] = [
        { key: 'todo', icon: <ContainerOutlined />, label: 'Todo-List' },
        { key: 'profile', icon: <UserOutlined />, label: 'Профиль' },
    ]

    const itemsTabs: { key: filterTypes; label: string }[] = [
        {
            key: 'all',
            label: `Все (${infoTasks?.all})`,
        },
        {
            key: 'inWork',
            label: `В работе (${infoTasks?.inWork})`,
        },
        {
            key: 'completed',
            label: `Сделано (${infoTasks?.completed})`,
        },
    ]

    const fetchTasksByCategories = useCallback(async (filter: filterTypes) => {
        try {
            setIsFetching(true)
            const todos = await getTasksByCategory(filter)
            setTasks(todos.data)
            setInfoTasks(todos.info)
            setFilter(filter)
        } catch {
            setAndAlertError('Ошибка получения задач!')
        } finally {
            setIsFetching(false)
        }
    }, [])

    useEffect(() => {
        if (siderItem === 'todo') {
            const refetch = setInterval(() => {
                fetchTasksByCategories(filter)
                console.log('update')
            }, 5000)

            return () => clearInterval(refetch)
        }
    }, [fetchTasksByCategories, filter, siderItem])

    const setAndAlertError = (error: string) => {
        alert(error)
    }

    return (
        <Layout hasSider style={{ height: '100vh' }}>
            <Sider width="10%" theme="light">
                <Menu
                    items={itemsSider}
                    mode="inline"
                    defaultSelectedKeys={[`${siderItem}`]}
                    onSelect={key => {
                        setSiderItem(key.key)
                    }}></Menu>
            </Sider>
            <Layout>
                {siderItem === 'todo' ? (
                    <>
                        <Header style={{ backgroundColor: 'transparent', margin: '0.5rem 0 0 0' }}>
                            <AddTask fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
                        </Header>
                        <Content>
                            <Flex vertical align="center">
                                <Tabs
                                    defaultActiveKey="all"
                                    activeKey={filter}
                                    items={itemsTabs}
                                    centered
                                    size="large"
                                    onChange={(activeKey: string) => fetchTasksByCategories(activeKey as filterTypes)}
                                />
                                <TaskList tasks={tasks} fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
                                {isFetching && <h3>Fetching tasks...</h3>}
                            </Flex>
                        </Content>
                    </>
                ) : (
                    <Flex vertical align="center">
                        <Profile></Profile>
                    </Flex>
                )}
            </Layout>
        </Layout>
    )
}

export default App
