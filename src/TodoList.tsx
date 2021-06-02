import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


type PropsType = {
    title: string
    tasks: TaskType[]
    todolistID: string
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => props.addTask(title, props.todolistID)

    const tasksJSX = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : '';
        const removeTask = () => {props.removeTask(t.id, props.todolistID)}

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.todolistID)}

        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistID)

        return (
            <li key={t.id} className={taskClass}>
            <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}/>
            <EditableSpan
                changeTitle={changeTaskTitle}
                title={t.title}/>
            <button onClick={removeTask}>x</button>
        </li>)
    })
    const onClickAll = () => {props.changeFilter('all', props.todolistID)}
    const onClickActive = () => {props.changeFilter('active', props.todolistID)}
    const onClickCompleted = () => {props.changeFilter('completed', props.todolistID)}
    const removeTodoList = () => {props.removeTodoList(props.todolistID)}
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todolistID)

    return <div>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <button onClick={removeTodoList}>X</button>
        <AddItemForm addItem={addTask}/>
        <ul> {tasksJSX}</ul>
        <div>
            <button onClick={onClickAll} className={props.filter === 'all' ? 'btn' : ''}>All</button>
            <button onClick={onClickActive} className={props.filter === 'active' ? 'btn' : ''}>Active</button>
            <button onClick={onClickCompleted} className={props.filter === 'completed' ? 'btn' : ''}>Completed</button>
        </div>
    </div>
}


