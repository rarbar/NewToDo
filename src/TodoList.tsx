import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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
        const removeTask = () => {
            props.removeTask(t.id, props.todolistID)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.todolistID)
        }

        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistID)

        return (
            <li key={t.id}>
                <span className={taskClass}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={t.isDone}
                        onChange={changeTaskStatus}/>
                <EditableSpan
                    changeTitle={changeTaskTitle}
                    title={t.title}/></span>
                <IconButton
                    style={{marginLeft:'15px'}}
                    size={'small'}
                    color={'secondary'}
                    onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>)
    })
    const onClickAll = () => {props.changeFilter('all', props.todolistID)}
    const onClickActive = () => {props.changeFilter('active', props.todolistID)}
    const onClickCompleted = () => {props.changeFilter('completed', props.todolistID)}
    const removeTodoList = () => {props.removeTodoList(props.todolistID)}
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todolistID)

    return <div>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

        <IconButton
            style={{marginLeft:'15px'}}
            size={'small'}
            onClick={removeTodoList}>
            <Delete
                color={'secondary'}/>
        </IconButton>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle:'none',padding:'0px'}}> {tasksJSX}</ul>
        <div>
            <Button style={{marginLeft: '5px'}}
                    size={'small'}
                    color={props.filter === 'all' ? 'primary' : 'default'}
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onClickAll}>All</Button>
            <Button
                style={{marginLeft: '5px'}}
                size={'small'}
                color={props.filter === 'active' ? 'primary' : 'default'}
                variant={props.filter === 'active' ? 'outlined' : 'contained'}
                onClick={onClickActive}>Active</Button>
            <Button
                style={{marginLeft: '5px'}}
                size={'small'}
                color={props.filter === 'completed' ? 'primary' : 'default'}
                variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                onClick={onClickCompleted}>Completed</Button>
        </div>
    </div>
}


