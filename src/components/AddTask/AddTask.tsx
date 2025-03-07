import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
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
        } catch {
            setError('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
            setTodoTitle('')
        }
    }

    const isValidation = (todoTitle: string): boolean => {
        if (todoTitle.length < 2 && todoTitle.length <= 64) {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!isValidation(todoTitle)) {
            setError('Ошибка валидации! Нельзя создать задачу с количеством символов меньше 2-х.')
        } else {
            handleAddTask()
        }
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTodoTitle(event.target.value)
    }

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])

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
