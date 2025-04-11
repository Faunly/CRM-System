import { FC, useState } from 'react'
import { EditFilled, DeleteFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import { Checkbox, Input, Button, Typography, Flex } from 'antd'

const { Text } = Typography

import classes from './TasksItem.module.css'

type TaskItemProps = {
    id: number
    titleTask: string
    isDone: boolean
    onChangeData: (id: number, titleTask: string, isDone: boolean) => void
    onDelete: (id: number) => void
}

const TaskItem: FC<TaskItemProps> = ({ id, titleTask, isDone, onChangeData, onDelete }) => {
    const [isEdited, setIsEdited] = useState(false)
    const [curTitleTask, setCurTitleTask] = useState(titleTask)
    const [prevTaskTitle, setPrevTaskTitle] = useState('')

    const handleEdited = () => {
        setIsEdited(prevState => !prevState)
        setPrevTaskTitle(curTitleTask)
    }

    const handleChange = (newValue: string) => {
        setCurTitleTask(newValue)
    }

    const handleCancel = () => {
        setCurTitleTask(prevTaskTitle)
        setIsEdited(prevState => !prevState)
    }

    return (
        <Flex justify="space-between" className={classes.task}>
            <Flex align="center" style={{ width: '100%' }}>
                <Checkbox defaultChecked={isDone} onClick={() => onChangeData(id, titleTask, !isDone)} />
                {!isEdited ? (
                    <Text delete={isDone} className={classes.text}>
                        {curTitleTask}
                    </Text>
                ) : (
                    <Input
                        type="text"
                        className={classes.inputEdit}
                        value={curTitleTask}
                        maxLength={64}
                        onChange={event => handleChange(event.target.value)}
                    />
                )}
            </Flex>
            <Flex align="center" gap="5px" style={{ paddingRight: '0.5rem' }}>
                {!isEdited ? (
                    <Button style={{ backgroundColor: '#0077ff' }} onClick={handleEdited}>
                        <EditFilled style={{ color: 'white', fontSize: '1rem' }} alt="edit" />
                    </Button>
                ) : (
                    <>
                        <Button
                            style={{ backgroundColor: '#00a200' }}
                            onClick={() => {
                                onChangeData(id, curTitleTask, isDone)
                                handleEdited()
                            }}>
                            <CheckCircleFilled style={{ fontSize: '1rem', color: 'white' }} alt="save" />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#ff4747' }}
                            onClick={() => {
                                handleCancel()
                            }}>
                            <CloseCircleFilled style={{ fontSize: '1rem', color: 'white' }} alt="cancel" />
                        </Button>
                    </>
                )}
                <Button style={{ backgroundColor: '#ff4747' }} onClick={() => onDelete(id)}>
                    <DeleteFilled style={{ fontSize: '1rem', color: 'white' }} />
                </Button>
            </Flex>
        </Flex>
    )
}

export default TaskItem
