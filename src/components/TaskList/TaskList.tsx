import TaskItem from '../TaskItem/TaskItem.js'
import { changeDataTask, deleteTask } from '../../api/http.js'
import { FC, useState } from 'react'
import { TasksType } from '../../types/todolist.ts'
import { List } from 'antd'
import classes from './TaskList.module.css'

type TaskListProps = {
    tasks: TasksType[]
    fetchTasksByCategories: () => void
}

const TaskList: FC<TaskListProps> = ({ fetchTasksByCategories, tasks }) => {
    const [isFetching, setIsFetching] = useState(false)

    const handleDeleteTask = async (id: number) => {
        try {
            setIsFetching(true)
            await deleteTask(id)
            fetchTasksByCategories()
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
            await fetchTasksByCategories()
        } catch {
            setAndAlertError('Ошибка изменения задачи!')
        } finally {
            setIsFetching(false)
        }
    }

    const setAndAlertError = (error: string) => {
        alert(error)
    }

    return (
        <List className={classes.tasklist}>
            {!isFetching &&
                tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        titleTask={task.title}
                        isDone={task.isDone}
                        onChangeData={handleChangeDataTask}
                        onDelete={handleDeleteTask}
                    />
                ))}
        </List>
    )
}

export default TaskList
