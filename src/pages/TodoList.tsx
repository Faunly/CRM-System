import { Flex, Tabs } from 'antd'
import TaskList from '../components/TaskList/TaskList'
import { filterTypes } from '../types/filter'
import { useCallback, useEffect, useState } from 'react'
import { CategoriesType, TasksType } from '../types/todolist'
import { Content, Header } from 'antd/es/layout/layout'
import AddTask from '../components/AddTask/AddTask'
import { getTasksByCategory } from '../api/http'

const TodoList = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [filter, setFilter] = useState<filterTypes>('all')
    const [infoTasks, setInfoTasks] = useState<CategoriesType>()
    const [isFetching, setIsFetching] = useState(false)

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
        const fetchData = () => {
            fetchTasksByCategories(filter)
            // console.log('update')
        }

        fetchData()
        const refetch = setInterval(fetchData, 5000)

        return () => clearInterval(refetch)
    }, [filter])

    const setAndAlertError = (error: string) => {
        alert(error)
    }

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

    return (
        <Flex vertical style={{ alignItems: 'center', width: '100%', overflowY: 'hidden' }}>
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
                        onChange={(activeKey: string) => {
                            fetchTasksByCategories(activeKey as filterTypes)
                        }}
                    />
                    <TaskList tasks={tasks} fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
                    {isFetching && <h3>Fetching tasks...</h3>}
                </Flex>
            </Content>
        </Flex>
    )
}

export default TodoList
