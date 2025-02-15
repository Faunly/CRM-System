import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../http.js'

type AddTaskProps = {
    isFetching: boolean
    setIsFetching: (value: boolean) => void
    fetchTasksByCategories: () => void
}

const AddTask: FC<AddTaskProps> = ({ isFetching, setIsFetching, fetchTasksByCategories }) => {
    const [todoTitle, setTodoTitle] = useState('')
    const [error, setError] = useState('')

    const handleAddTask = async () => {
        try {
            setIsFetching(true)
            await addTask(todoTitle)
        } catch {
            setError('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
            setTodoTitle('')
            fetchTasksByCategories()
        }
    }

    const validation = (): boolean => {
        if (todoTitle.length < 2) {
            setError('Ошибка валидации! Нельзя создать задачу с количеством символов меньше 2-х.')
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validation()) {
            handleAddTask()
        }
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value)
    }

    if (error) {
        alert(error)
        setError('')
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
                    onChange={e => {
                        handleChangeInput(e)
                    }}
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
