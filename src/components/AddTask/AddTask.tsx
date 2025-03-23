import { ChangeEvent, FC, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../api/http.js'
import { Input, Button, Form, FormProps } from 'antd'

type AddTaskProps = {
    fetchTasksByCategories: () => void
}

type FieldType = {
    titleTask: string
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

    const onFinish: FormProps<FieldType>['onFinish'] = () => {
        handleAddTask()
        setTodoTitle('')
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
        <Form onFinish={onFinish}>
            <div className={classes.container}>
                <Form.Item<FieldType>
                    name="titleTask"
                    id="titleTask"
                    rules={[{ min: 2, message: 'Нельзя создать задачу с количеством символов меньше 2-х!' }]}>
                    <Input
                        type="text"
                        id="input-task"
                        placeholder="Task To Be Done..."
                        value={todoTitle}
                        onChange={handleChangeInput}
                        showCount
                        maxLength={64}
                        minLength={1}
                        className={`${classes.input} ${error && classes.error}`}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        className={`${classes.button} ${isFetching && classes.disabled}`}
                        disabled={isFetching}
                        htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default AddTask
