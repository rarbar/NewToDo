import React, {useEffect, useState} from 'react';
import {tasksApi} from './api/tasks.api';


export default {
    title: 'API'
}
const settings = {
    //разрешает тебе общаться с сервером (для coocki)
    withCredentials: true,
    headers: {'api-key': 'a8783d94-2cda-4428-9a92-397a86dcdb06'}
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '76dff4cd-3f66-4d8e-8845-40827eabff72'
        //любой запрос вседа вернет нам promise
        tasksApi.getTask(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '76dff4cd-3f66-4d8e-8845-40827eabff72'
        const title = 'New 333'

        tasksApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data)
                }
            })
            .catch(e => console.log(e))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTask] = useState<string>('')
    const [todolistId, setTodolist] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTaskTitle = () => {
        tasksApi.updateTasks(todolistId, taskId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data)
                }
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder="task" value={taskId}
                   onChange={(e) => {
                       setTask(e.currentTarget.value)
                   }}/>

            <input placeholder="todolist" value={todolistId}
                   onChange={(e) => {
                       setTodolist(e.currentTarget.value)
                   }}/>

            <input placeholder="title" value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>

            <button onClick={updateTaskTitle}> update task</button>
        </div>
    </div>

}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTask] = useState<string>('')
    const [todolistId, setTodolist] = useState<string>('')

    const deleteTask = () => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data)
                }
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder="task" value={taskId}
                   onChange={(e) => {
                       setTask(e.currentTarget.value)
                   }}/>
            <input placeholder="todolist" value={todolistId}
                   onChange={(e) => {
                       setTodolist(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}> delete task</button>
        </div>
    </div>
}






