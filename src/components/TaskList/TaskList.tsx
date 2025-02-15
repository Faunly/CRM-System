import TaskItem from '../TaskItem/TaskItem.js'
import { changeDataTask, deleteTask } from '../../http.js'
import { FC } from 'react'
import { TasksType } from '../../types/Tasks.js'

type TaskListProps = {
    setIsFetching: (value: boolean) => void
    tasks: TasksType[]
    setError: (value: string) => void
    fetchTasksByCategories: () => void
    isFetching: boolean
}

const TaskList: FC<TaskListProps> = ({ setIsFetching, setError, fetchTasksByCategories, isFetching, tasks }) => {
    const handleDeleteTask = async (id: number) => {
        try {
            setIsFetching(true)
            await deleteTask(id)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
            fetchTasksByCategories()
        }
    }

    const handleChangeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
        try {
            setIsFetching(true)
            await changeDataTask(id, titleTask, isDone)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
            fetchTasksByCategories()
        }
    }

    return (
        !isFetching &&
        tasks.map(task => (
            <TaskItem
                key={task.id}
                id={task.id}
                titleTask={task.title}
                isDone={task.isDone}
                onChangeData={handleChangeDataTask}
                onDelete={handleDeleteTask}
            />
        ))
    )
}

export default TaskList
