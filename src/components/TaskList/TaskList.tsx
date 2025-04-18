import TaskItem from '../TaskItem/TaskItem.js'
import { FC } from 'react'
import { TasksType } from '../../types/todolist.ts'
import { List } from 'antd'
import classes from './TaskList.module.css'

type TaskListProps = {
    tasks: TasksType[]
    fetchTasksByFilter: () => void
}

const TaskList: FC<TaskListProps> = ({ tasks, fetchTasksByFilter }) => {
    return (
        <List className={classes.tasklist}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    titleTask={task.title}
                    isDone={task.isDone}
                    fetchTasksByFilter={fetchTasksByFilter}
                />
            ))}
        </List>
    )
}

export default TaskList
