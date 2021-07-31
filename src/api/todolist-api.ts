import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'api-key': 'a8783d94-2cda-4428-9a92-397a86dcdb06'}
})

export type  todoType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
//T длженерик
export type  ResponseType<T = {}> = {
    resultCode: number,
    messages: [string],
    fieldsErrors: [string],
    data: T
}

export const todolistApi = {
    getTodos() {
        return instance.get<todoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: todoType }>>('todo-lists', {title})
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}