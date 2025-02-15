import { FC, useState } from 'react'
import imageEdit from '/src/assets/pencil.svg'
import imageRemove from '/src/assets/trash.svg'
import imageSave from '/src/assets/success.svg'
import imageCancel from '/src/assets/cancel.svg'

import classes from './TasksItem.module.css'

type TaskItemProps = {
    id: number
    titleTask: string
    isDone: boolean
    onChangeData: (id: number, titleTask: string, isDone: boolean, check?: string) => void
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
                    <label
                        htmlFor="checkboxInput"
                        onClick={() => onChangeData(id, titleTask, !isDone, 'check')}></label>
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
                        <img src={imageEdit} width="20px" height="20px" alt="pencil" />
                    </button>
                ) : (
                    <>
                        <button
                            className={`${classes.button} ${classes.green}`}
                            onClick={() => {
                                onChangeData(id, curTitleTask, isDone)
                                handleEdited()
                            }}>
                            <img src={imageSave} width="20px" height="20px" alt="checkmark" />
                        </button>
                        <button
                            className={`${classes.button} ${classes.red}`}
                            onClick={() => {
                                handleCancel()
                            }}>
                            <img src={imageCancel} width="20px" height="20px" alt="cross" />
                        </button>
                    </>
                )}
                <button className={`${classes.button} ${classes.red}`} onClick={() => onDelete(id)}>
                    <img src={imageRemove} width="20px" height="20px" alt="pencil" />
                </button>
            </div>
        </div>
    )
}

export default TaskItem
