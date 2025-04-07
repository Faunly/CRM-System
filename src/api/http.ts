import { filterTypes } from './../types/filter'
import axios from 'axios'

axios.defaults.baseURL = 'https://easydev.club/api/v1/todos'
axios.defaults.headers.post = {
    accept: 'application/json',
    'Content-Type': 'application/json',
}
axios.defaults.headers.put = {
    accept: 'application/json',
    'Content-Type': 'application/json',
}
axios.defaults.headers.delete = { accept: 'application/json' }

export const getTasksByCategory = async (filter: filterTypes) => {
    try {
        const response = await axios({
            params: { filter },
            method: 'GET',
        })
        return await response.data
    } catch {
        throw new Error()
    }
}

export const addTask = async (titleTask: string) => {
    try {
        const response = await axios({
            method: 'POST',
            data: JSON.stringify({
                isDone: false,
                title: titleTask,
            }),
        })
        return await response.data
    } catch {
        throw new Error()
    }
}

export const changeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
    try {
        const response = await axios({
            url: `/${id}`,
            method: 'PUT',
            data: JSON.stringify({
                isDone: isDone,
                title: titleTask,
            }),
        })
        return await response.data
    } catch {
        throw new Error()
    }
}

export const deleteTask = async (id: number) => {
    try {
        await axios({
            url: `/${id}`,
            method: 'DELETE',
        })
    } catch {
        throw new Error()
    }
}
