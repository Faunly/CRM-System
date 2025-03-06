export type filterTypes = 'all' | 'inWork' | 'completed'

export const fetchTasksByCategory = async (filter: filterTypes) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)
        return await response.json()
    } catch {
        throw new Error()
    }
}

export const addTask = async (titleTask: string) => {
    try {
        const response = await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            body: JSON.stringify({
                isDone: false,
                title: titleTask,
            }),
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return await response.json()
    } catch {
        throw new Error()
    }
}

export const changeDataTask = async (id: number, titleTask: string, isDone: boolean) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                isDone: isDone,
                title: titleTask,
            }),
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return await response.json()
    } catch {
        throw new Error()
    }
}

export const deleteTask = async (id: number) => {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
            },
        })
    } catch {
        throw new Error()
    }
}
