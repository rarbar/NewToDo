import React, {useEffect, useState} from 'react'
import {todolistApi} from './api/todolist-api';

export default {
    title: 'API'
}
const settings = {
    // withCredentials разрешает тебе общаться с сервером (для coocki)
    withCredentials: true,
    headers: {'api-key': 'a8783d94-2cda-4428-9a92-397a86dcdb06'}
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //любой запрос вседа вернет нам promise
        todolistApi.getTodos()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT'
        todolistApi.createTodo(title)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd8ae8e59-f90d-4d49-a6cf-ad7651a1c672'
        const title = 'ANGULARI'
        todolistApi.updateTodoTitle(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6c12256c-42ab-4b29-a36d-8f480c2126d0'
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
