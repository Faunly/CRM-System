import { useEffect, useState } from 'react'
import { fetchTasksByCategory } from './http.js'

import classes from './App.module.css'
import AddTask from './components/AddTask/AddTask.js'
import CategoriesList from './components/CategoriesList/CategoriesList.js'
import TaskList from './components/TaskList/TaskList.tsx'
import { TasksType } from './types/Tasks.ts'
import { CategoriesType } from './types/Categories'

const App = () => {
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [categories, setCategories] = useState<CategoriesType>()
    const [error, setError] = useState('')
    const [isFetching, setIsFetching] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchTasksByCategories('all')
    }, [])

    const fetchTasksByCategories = async (filter: string) => {
        setIsFetching(true)
        try {
            const todos = await fetchTasksByCategory(filter)
            setTasks(todos.data)
            setCategories(todos.info)
            setFilter(filter)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
        }
    }

    if (error) {
        console.log('Error fetch!!!')
    }

    return (
        <div className={classes.container}>
            <AddTask
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                fetchTasksByCategories={() => fetchTasksByCategories(filter)}
            />
            <CategoriesList
                isFetching={isFetching}
                categories={categories}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <TaskList
                isFetching={isFetching}
                tasks={tasks}
                fetchTasksByCategories={() => fetchTasksByCategories(filter)}
                setIsFetching={setIsFetching}
                setError={setError}
            />
            {isFetching && <h3>Fetching tasks...</h3>}
        </div>
    )
}

export default App
