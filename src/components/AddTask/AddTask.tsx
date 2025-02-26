import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../api/http.js'
import { Input } from 'antd'

type AddTaskProps = {
    isFetching: boolean
    setIsFetching: (value: boolean) => void
    fetchTasksByCategories: () => void
}

const AddTask: FC<AddTaskProps> = ({ isFetching, setIsFetching, fetchTasksByCategories }) => {
    const [todoTitle, setTodoTitle] = useState('')
    const [errorTodo, setErrorTodo] = useState('')

    const handleAddTask = async () => {
        try {
            setIsFetching(true)
            await addTask(todoTitle)
        } catch {
            setErrorTodo('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
            setTodoTitle('')
            fetchTasksByCategories()
        }
    }

    const validation = (): boolean => {
        console.log('enter validation()')
        if (todoTitle.length < 2) {
            setErrorTodo('Ошибка валидации! Нельзя создать задачу с количеством символов меньше 2--х.')
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (validation()) {
            handleAddTask()
        }
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value)
        setErrorTodo('')
    }

    if (errorTodo) {
        alert(errorTodo)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
                <label htmlFor="input-task"></label>
                <Input
                    type="text"
                    id="input-task"
                    placeholder="Task To Be Done..."
                    value={todoTitle}
                    status={errorTodo && 'error'}
                    onChange={e => {
                        handleChangeInput(e)
                    }}
                    maxLength={64}
                    required
                    className={`${classes.input} ${errorTodo && classes.errorTodo}`}
                />

                <button className={`${classes.button} ${isFetching && classes.disabled}`} disabled={isFetching}>
                    Add
                </button>
            </div>
        </form>
    )
}

export default AddTask
