import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../api/http.js'

type AddTaskProps = {
    fetchTasksByCategories: () => void
}

const AddTask: FC<AddTaskProps> = ({ fetchTasksByCategories }) => {
    const [todoTitle, setTodoTitle] = useState('')
    const [error, setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)

    const handleAddTask = async () => {
        try {
            setIsFetching(true)
            await addTask(todoTitle)
            fetchTasksByCategories()
            setTodoTitle('')
        } catch {
            setAndAlertError('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
        }
    }

    const validateTitle = (todoTitle: string): boolean => {
        if (todoTitle.length < 2 && todoTitle.length <= 64) {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validateTitle(todoTitle)) {
            setAndAlertError('Ошибка валидации! Нельзя создать задачу с количеством символов меньше 2-х.')
        } else {
            handleAddTask()
        }
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTodoTitle(event.target.value)
    }

    const setAndAlertError = (error: string) => {
        setError(error)
        alert(error)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
                <label htmlFor="input-task"></label>
                <input
                    type="text"
                    id="input-task"
                    placeholder="Task To Be Done..."
                    value={todoTitle}
                    onChange={handleChangeInput}
                    maxLength={64}
                    required
                    className={`${classes.input} ${error && classes.error}`}
                />
                <button className={`${classes.button} ${isFetching && classes.disabled}`} disabled={isFetching}>
                    Add
                </button>
            </div>
        </form>
    )
}

export default AddTask
