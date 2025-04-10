import { filterTypes } from './../types/filter'
import axios from 'axios'

const instanceAxios = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const getTasksByCategory = async (filter: filterTypes) => {
    try {
        const response = await instanceAxios.get('/todos', {
            params: { filter },
        })
        return await response.data
    } catch {
        throw new Error()
    }
}

export const addTask = async (titleTask: string) => {
    try {
        const response = await instanceAxios.post('/todos', {
            isDone: false,
            title: titleTask,
        })
        console.log(response)
        return response.data
    } catch {
        throw new Error()
    }
}

export const changeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
    try {
        const response = await instanceAxios.put(`/todos/${id}`, {
            isDone: isDone,
            title: titleTask,
        })
        return await response.data
    } catch {
        throw new Error()
    }
}

export const deleteTask = async (id: number) => {
    try {
        await instanceAxios.delete(`/todos/${id}`)
    } catch {
        throw new Error()
    }
}
