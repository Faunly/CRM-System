import TaskItem from '../TaskItem/TaskItem.js'
import { FC } from 'react'
import { TasksType } from '../../types/todolist.ts'
import { List } from 'antd'
import classes from './TaskList.module.css'

type TaskListProps = {
    tasks: TasksType[]
    fetchTasksByFilter: () => void
    handleDeleteTask: (id: number) => void
    handleChangeDataTask: (id: number, titleTask: string, isDone: boolean) => void
}

const TaskList: FC<TaskListProps> = ({ tasks, handleDeleteTask, handleChangeDataTask }) => {
    return (
        <List className={classes.tasklist}>
            {tasks.map(task => (
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
