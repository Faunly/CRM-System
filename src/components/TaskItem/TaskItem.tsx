import { FC, useState } from 'react'
import { EditFilled, DeleteFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'

// import imageEdit from '/src/assets/pencil.svg'
// import imageRemove from '/src/assets/trash.svg'
// import imageSave from '/src/assets/success.svg'
// import imageCancel from '/src/assets/cancel.svg'

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
        <div className={classes.task}>
            <div className={classes.leftContainer}>
                <div className={classes.round}>
                    <input type="checkbox" name="checkboxInput" defaultChecked={isDone} />
                    <label htmlFor="checkboxInput" onClick={() => onChangeData(id, titleTask, !isDone)}></label>
                </div>
                {!isEdited ? (
                    <h3 className={isDone ? `${classes.checked}` : undefined}>{curTitleTask}</h3>
                ) : (
                    <input
                        type="text"
                        className={classes.inputEdit}
                        placeholder={curTitleTask}
                        value={curTitleTask}
                        maxLength={64}
                        onChange={event => handleChange(event.target.value)}
                    />
                )}
            </div>
            <div className={classes.rightContainer}>
                {!isEdited ? (
                    <button className={`${classes.button} ${classes.blue}`} onClick={handleEdited}>
                        <EditFilled style={{ color: 'white', fontSize: '1.4rem' }} alt="edit" />
                    </button>
                ) : (
                    <>
                        <button
                            className={`${classes.button} ${classes.green}`}
                            onClick={() => {
                                onChangeData(id, curTitleTask, isDone)
                                handleEdited()
                            }}>
                            <CheckCircleFilled style={{ fontSize: '1.4rem', color: 'white' }} alt="save" />
                        </button>
                        <button
                            className={`${classes.button} ${classes.red}`}
                            onClick={() => {
                                handleCancel()
                            }}>
                            <CloseCircleFilled style={{ fontSize: '1.4rem', color: 'white' }} alt="cancel" />
                        </button>
                    </>
                )}
                <button className={`${classes.button} ${classes.red}`} onClick={() => onDelete(id)}>
                    <DeleteFilled style={{ fontSize: '1.4rem', color: 'white' }} />
                </button>
            </div>
        </div>
    )
}

export default TaskItem
