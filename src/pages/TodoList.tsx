import { Flex, Tabs, Typography } from 'antd'
import TaskList from '../components/TaskList/TaskList'
import { filterTypes } from '../types/filter'
import { useCallback, useEffect, useState } from 'react'
import { CategoriesType, TasksType } from '../types/todolist'
import { Content, Header } from 'antd/es/layout/layout'
import AddTask from '../components/AddTask/AddTask'
import { changeDataTask, deleteTask, getTasksByCategory } from '../api/http'

const TodoList = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [filter, setFilter] = useState<filterTypes>('all')
    const [infoTasks, setInfoTasks] = useState<CategoriesType>()
    const [isFetching, setIsFetching] = useState(false)

    const handleDeleteTask = async (id: number) => {
        try {
            setIsFetching(true)
            await deleteTask(id)
            await fetchTasksByFilter()
        } catch {
            setAndAlertError('Ошибка удаления задачи!')
        } finally {
            setIsFetching(false)
        }
    }

    const handleChangeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
        try {
            setIsFetching(true)
            await changeDataTask(id, titleTask, isDone)
            await fetchTasksByFilter()
        } catch {
            setAndAlertError('Ошибка изменения задачи!')
        } finally {
            setIsFetching(false)
        }
    }

    const fetchTasksByFilter = useCallback(
        async (fetchFilter = filter) => {
            try {
                setIsFetching(true)
                const todos = await getTasksByCategory(fetchFilter)
                setTasks(todos.data)
                setInfoTasks(todos.info)
            } catch {
                setAndAlertError('Ошибка получения задач!')
            } finally {
                setIsFetching(false)
            }
        },
        [filter],
    )

    useEffect(() => {
        fetchTasksByFilter()
        const refetch = setInterval(() => {
            fetchTasksByFilter()
        }, 5000)

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
                <AddTask fetchTasksByFilter={fetchTasksByFilter} />
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
                            setFilter(activeKey as filterTypes)
                        }}
                    />
                    <TaskList
                        tasks={tasks}
                        fetchTasksByFilter={fetchTasksByFilter}
                        handleDeleteTask={handleDeleteTask}
                        handleChangeDataTask={handleChangeDataTask}
                    />
                    {isFetching && <Typography.Title level={5}>Fetching tasks...</Typography.Title>}
                </Flex>
            </Content>
        </Flex>
    )
}

export default TodoList
