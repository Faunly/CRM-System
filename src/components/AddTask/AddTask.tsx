import { FC, memo, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../api/http.js'
import { Input, Button, Form, Flex } from 'antd'
import type { FormProps } from 'antd'

type AddTaskProps = {
    fetchTasksByFilter: () => void
}

type FieldType = {
    todoTitle: string
}

const AddTask: FC<AddTaskProps> = memo(({ fetchTasksByFilter }) => {
    const [form] = Form.useForm<FieldType>()
    const [isFetching, setIsFetching] = useState(false)

    const handleAddTask = async () => {
        try {
            setIsFetching(true)
            await addTask(form.getFieldValue('todoTitle'))
            form.resetFields(['todoTitle'])
            fetchTasksByFilter()
        } catch {
            setAndAlertError('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
        }
    }

    const onFinish: FormProps<FieldType>['onFinish'] = () => {
        handleAddTask()
    }

    const setAndAlertError = (error: string) => {
        alert(error)
    }

    return (
        <Form form={form} onFinish={onFinish}>
            <Flex justify="center" align="end" gap="20px">
                <Form.Item<FieldType>
                    name="todoTitle"
                    rules={[
                        { required: true, min: 2, message: 'Нельзя создать задачу с количеством символов меньше 2-х!' },
                        { max: 64, message: 'Нельзя создать задачу с количеством символов больше 64-х!' },
                    ]}>
                    <Input
                        type="text"
                        id="input-task"
                        placeholder="Task To Be Done..."
                        showCount
                        maxLength={64}
                        className={`${classes.input}`}
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
            </Flex>
        </Form>
    )
})

export default AddTask
