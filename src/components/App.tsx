import { useEffect, useState } from 'react'
import { getTasksByCategory } from '../api/http.js'
import { Tabs } from 'antd'

import classes from '../App.module.css'
import AddTask from '../components/AddTask/AddTask.tsx'
import TaskList from '../components/TaskList/TaskList.tsx'
import { CategoriesType, TasksType } from '../types/todolist.ts'
import { filterTypes } from '../types/filter'

const App = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [infoTasks, setInfoTasks] = useState<CategoriesType>()
    const [isFetching, setIsFetching] = useState(true)
    const [filter, setFilter] = useState<filterTypes>('all')

    const items: { key: filterTypes; label: string }[] = [
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

    useEffect(() => {
        fetchTasksByCategories('all')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchTasksByCategories = async (filter: filterTypes) => {
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
    }

    const setAndAlertError = (error: string) => {
        alert(error)
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
