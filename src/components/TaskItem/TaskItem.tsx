import { FC, useState } from 'react';
import { EditFilled, DeleteFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { Checkbox, Input, Button, Typography, Flex, Form, notification } from 'antd';

const { Text } = Typography;

import classes from './TasksItem.module.css';
import { deleteTask, changeDataTask } from '../../api/http';

type TaskItemProps = {
    id: number;
    titleTask: string;
    isDone: boolean;
    fetchTasksByFilter: () => void;
};

type FieldType = {
    editTitleTask: string;
};

const TaskItem: FC<TaskItemProps> = ({ id, titleTask, isDone, fetchTasksByFilter }) => {
    const [form] = Form.useForm<FieldType>();
    const [isEdited, setIsEdited] = useState(false);
    const [curTitleTask, setCurTitleTask] = useState(titleTask);
    const [prevTaskTitle, setPrevTaskTitle] = useState('');
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const showAlert = (error: string) => {
        notificationApi.error({
            message: `${error}`,
            placement: 'top',
            showProgress: true,
            pauseOnHover: false,
        });
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            await fetchTasksByFilter();
        } catch {
            showAlert('Ошибка удаления задачи!');
        }
    };

    const handleChangeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
        try {
            await changeDataTask(id, titleTask, isDone);
            await fetchTasksByFilter();
        } catch {
            showAlert('Ошибка изменения задачи!');
        }
    };

    const handleEdited = () => {
        setIsEdited(prevState => !prevState);
        form.setFieldValue(['editTitleTask'], curTitleTask);
        setPrevTaskTitle(curTitleTask);
    };

    const handleCancel = () => {
        setCurTitleTask(prevTaskTitle);
        setIsEdited(prevState => !prevState);
    };

    const onFinish = (value: FieldType) => {
        handleChangeDataTask(id, value.editTitleTask, isDone);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Flex justify="space-between" className={classes.task}>
                <Flex align="center" gap={'0.5rem'} style={{ width: '100%' }}>
                    <Checkbox defaultChecked={isDone} onClick={() => handleChangeDataTask(id, titleTask, !isDone)} />
                    {!isEdited ? (
                        <Text delete={isDone} className={classes.text}>
                            {curTitleTask} {isDone}
                        </Text>
                    ) : (
                        <Form.Item<FieldType>
                            name="editTitleTask"
                            style={{ margin: 0, width: '95%' }}
                            rules={[
                                {
                                    required: true,
                                    min: 2,
                                    message: 'Нельзя изменить задачу с количеством символов в названии меньше 2-х!',
                                },
                                {
                                    max: 64,
                                    message: 'Нельзя изменить задачу с количеством символов в названии больше 64-х!',
                                },
                            ]}>
                            <Input type="text" className={classes.inputEdit} maxLength={64} />
                        </Form.Item>
                    )}
                </Flex>
                <Flex align="center" gap="5px" style={{ paddingRight: '0.5rem' }}>
                    {!isEdited ? (
                        <Button style={{ backgroundColor: '#0077ff' }} onClick={handleEdited}>
                            <EditFilled style={{ color: 'white', fontSize: '1rem' }} alt="edit" />
                        </Button>
                    ) : (
                        <>
                            <Form.Item style={{ margin: 0 }}>
                                <Button style={{ backgroundColor: '#00a200' }} htmlType="submit">
                                    <CheckCircleFilled style={{ fontSize: '1rem', color: 'white' }} alt="save" />
                                </Button>
                            </Form.Item>
                            <Button
                                style={{ backgroundColor: '#ff4747' }}
                                onClick={() => {
                                    handleCancel();
                                }}>
                                <CloseCircleFilled style={{ fontSize: '1rem', color: 'white' }} alt="cancel" />
                            </Button>
                        </>
                    )}
                    <Button style={{ backgroundColor: '#ff4747' }} onClick={() => handleDeleteTask(id)}>
                        <DeleteFilled style={{ fontSize: '1rem', color: 'white' }} />
                    </Button>
                </Flex>
            </Flex>
            {notificationContextHolder}
        </Form>
    );
};

export default TaskItem;
