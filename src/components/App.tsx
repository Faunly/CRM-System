import { useEffect, useState } from 'react'
import { getTasksByCategory } from '../api/http.js'
import { Tabs } from 'antd'

import classes from '../App.module.css'
import AddTask from '../components/AddTask/AddTask.tsx'
import TaskList from '../components/TaskList/TaskList.tsx'
import { TasksType } from '../types/todolist.ts'
import { filterTypes } from '../types/filter'

const items: { key: string; label: string }[] = [
    {
        key: 'all',
        label: 'Все',
    },
    {
        key: 'inWork',
        label: 'В работе',
    },
    {
        key: 'completed',
        label: 'Сделано',
    },
]

const App = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [isFetching, setIsFetching] = useState(true)
    const [filter, setFilter] = useState<filterTypes>('all')

    const setAndAlertError = (error: string) => {
        alert(error)
    }

    useEffect(() => {
        fetchTasksByCategories('all')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchTasksByCategories = async (filter: filterTypes) => {
        try {
            setIsFetching(true)
            const todos = await getTasksByCategory(filter)
            setTasks(todos.data)
            setFilter(filter)
        } catch {
            setAndAlertError('Ошибка получения задач!')
        } finally {
            setIsFetching(false)
        }
    }

    return (
        <div className={classes.container}>
            <AddTask fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
            <Tabs
                defaultActiveKey="all"
                activeKey={filter}
                items={items}
                centered
                size="large"
                onChange={(activeKey: string) => fetchTasksByCategories(activeKey as filterTypes)}
            />
            <TaskList tasks={tasks} fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
            {isFetching && <h3>Fetching tasks...</h3>}
        </div>
    )
}

export default App
