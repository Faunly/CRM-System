import { FilterTypes } from '../types/filter';
import axios from 'axios';
import { TasksType } from '../types/todolist';

const instanceAxios = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getTasksByCategory = async (filter: FilterTypes) => {
  try {
    const response = await instanceAxios.get<TasksType>('/todos', {
      params: { filter },
    });
    return await response.data;
  } catch {
    throw new Error();
  }
};

export const addTask = async (titleTask: string) => {
  try {
    const response = await instanceAxios.post<TasksType>('/todos', {
      isDone: false,
      title: titleTask,
    });
    return response.data;
  } catch {
    throw new Error();
  }
};

export const changeDataTask = async (
  id: number,
  titleTask: string,
  isDone: boolean,
) => {
  try {
    const response = await instanceAxios.put<TasksType>(`/todos/${id}`, {
      isDone: isDone,
      title: titleTask,
    });
    return await response.data;
  } catch {
    throw new Error();
  }
};

export const deleteTask = async (id: number) => {
  try {
    await instanceAxios.delete(`/todos/${id}`);
  } catch {
    throw new Error();
  }
};
