import { useCallback, useEffect, useState } from 'react'
import { changeDataTask, deleteTask, getTasksByCategory } from '../api/http'
import { Flex, Tabs, message, notification } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { CategoriesType, TasksType } from '../types/todolist'
import { filterTypes } from '../types/filter'
import AddTask from '../components/AddTask/AddTask'
import TaskList from '../components/TaskList/TaskList'

const TodoList = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [filter, setFilter] = useState<filterTypes>('all')
    const [infoTasks, setInfoTasks] = useState<CategoriesType>()
    const [messageApi, messageContextHolder] = message.useMessage()
    const [notificationApi, notificationContextHolder] = notification.useNotification()

    const showAlert = (error: string) => {
        notificationApi.error({
            message: `${error}`,
            placement: 'top',
            showProgress: true,
            pauseOnHover: false,
        })
    }

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id)
            await fetchTasksByFilter()
        } catch {
            showAlert('Ошибка удаления задачи!')
        }
    }

    const handleChangeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
        try {
            await changeDataTask(id, titleTask, isDone)
            await fetchTasksByFilter()
        } catch {
            showAlert('Ошибка изменения задачи!')
        }
    }

    const fetchTasksByFilter = useCallback(
        async (fetchFilter = filter) => {
            try {
                const todos = await getTasksByCategory(fetchFilter)
                setTasks(todos.data)
                setInfoTasks(todos.info)
            } catch {
                showAlert('Ошибка получения задач!')
            }
        },
        [filter],
    )

    useEffect(() => {
        messageApi.open({
            type: 'loading',
            content: 'Получение задач...',
            duration: 1,
        })
    }, [])

    useEffect(() => {
        fetchTasksByFilter()

        const refetch = setInterval(() => {
            fetchTasksByFilter()
        }, 5000)

        return () => clearInterval(refetch)
    }, [filter])

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
                    {messageContextHolder}
                    {notificationContextHolder}
                </Flex>
            </Content>
        </Flex>
    )
}

export default TodoList
