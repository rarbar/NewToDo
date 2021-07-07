import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';


type TaskPropsType={
    task: TaskType
    todolistID: string
    removeTask: (id: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

export const Task=React.memo((props:TaskPropsType)=>{

    let taskClass = props.task.isDone ? 'is-done' : '';

    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistID)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistID)
    }
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistID)
    }

        return (
            <div key={props.task.id}>
                <span className={taskClass}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={props.task.isDone}
                        onChange={changeTaskStatus}/>
                <EditableSpan
                    changeTitle={changeTaskTitle}
                    title={props.task.title}/></span>
                <IconButton
                    style={{marginLeft: '15px'}}
                    size={'small'}
                    color={'secondary'}
                    onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        )
})