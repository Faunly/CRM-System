import { useEffect, useState } from 'react'
import { getTasksByCategory } from '../api/http.js'

import classes from '../App.module.css'
import AddTask from '../components/AddTask/AddTask.tsx'
import CategoriesList from '../components/CategoriesList/CategoriesList.js'
import TaskList from '../components/TaskList/TaskList.tsx'
import { TasksType } from '../types/todolist.ts'
import { CategoriesType } from '../types/todolist.ts'
import { filterTypes } from '../types/filter.ts'

const App = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [categories, setCategories] = useState<CategoriesType | undefined>()
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
            setCategories(todos.info)
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
            <CategoriesList
                isFetching={isFetching}
                categories={categories}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <TaskList tasks={tasks} fetchTasksByCategories={() => fetchTasksByCategories(filter)} />
            {isFetching && <h3>Fetching tasks...</h3>}
        </div>
    )
}

export default App
