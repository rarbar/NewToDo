import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {'api-key': 'a8783d94-2cda-4428-9a92-397a86dcdb06'}
})
type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}
export type  GetTaskResponseType = {
    items: TaskType[],
    totalCount: number,
    error: null
}
export type  ResponseTasksType = {
    items: TaskType[],
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}


export const tasksApi = {
    getTask(todolistId: string) {
        return instance.get<GetTaskResponseType>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTasksType>(`${todolistId}/tasks`, {title})
    },
    updateTasks(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTasksType>(`${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`${todolistId}/tasks/${taskId}`)
    }
}