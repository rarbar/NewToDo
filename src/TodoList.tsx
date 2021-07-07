import React, {useCallback} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {FilterValueType} from './AppWitheRedux';
import {Task} from './Task';


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
// props=({title, tasks, todolistID, filter, removeTodoList, addTask, removeTask, changeFilter, changeTaskTitle, changeStatus, changeTodoListTitle})

export const Todolist: React.FC<PropsType> = React.memo(({   title,
                                                  tasks,
                                                  todolistID,
                                                  filter,
                                                  removeTodoList,
                                                  addTask,
                                                  removeTask,
                                                  changeFilter,
                                                  changeTaskTitle,
                                                  changeStatus,
                                                  changeTodoListTitle
                                              }) => {

    const addTaskCallback = useCallback((title: string) => addTask(title, todolistID), [addTask, todolistID])

    let taskForTodoList = tasks

    if (filter === 'active') {
        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = taskForTodoList.filter(t => t.isDone)
    }

    const onClickAll = useCallback(() => {
        changeFilter('all', todolistID)
    }, [changeFilter, todolistID])
    const onClickActive = useCallback(() => {
        changeFilter('active', todolistID)
    }, [changeFilter, todolistID])
    const onClickCompleted = useCallback(() => {
        changeFilter('completed', todolistID)
    }, [changeFilter, todolistID])
    const removeTodoListCallback = useCallback(() => {
        removeTodoList(todolistID)
    }, [removeTodoList, todolistID])
    const changeTodoListTitleCallback = useCallback((title: string) => {
        changeTodoListTitle(title, todolistID)
    }, [changeTodoListTitle, todolistID])

    const removeTaskCallback = useCallback((taskId: string, todolistID: string) => {
        removeTask(taskId, todolistID)
    }, [removeTask])

    const changeTaskStatusCallback = useCallback((id: string, newValue: boolean, todolistID: string) => {
        changeStatus(id, newValue, todolistID)
    }, [changeStatus])

    const changeTaskTitleCallback = useCallback((id: string, title: string, todolistID: string) => {
        changeTaskTitle(id, title, todolistID)
    }, [changeTaskTitle])

    return <div>
        <EditableSpan title={title} changeTitle={changeTodoListTitleCallback}/>

        <IconButton
            style={{marginLeft: '15px'}}
            size={'small'}
            onClick={removeTodoListCallback}>
            <Delete
                color={'secondary'}/>
        </IconButton>
        <AddItemForm addItem={addTaskCallback}/>

        <ul style={{listStyle: 'none', padding: '0px'}}>

            {taskForTodoList.map(t => {
                return <Task
                    key={t.id}
                    task={t}
                    todolistID={todolistID}
                    removeTask={removeTaskCallback}
                    changeTaskTitle={changeTaskTitleCallback}
                    changeStatus={changeTaskStatusCallback}/>
            })
            }
        </ul>
        <div>
            <Button style={{marginLeft: '5px'}}
                    size={'small'}
                    color={filter === 'all' ? 'primary' : 'default'}
                    variant={filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onClickAll}>All</Button>
            <Button
                style={{marginLeft: '5px'}}
                size={'small'}
                color={filter === 'active' ? 'primary' : 'default'}
                variant={filter === 'active' ? 'outlined' : 'contained'}
                onClick={onClickActive}>Active</Button>
            <Button
                style={{marginLeft: '5px'}}
                size={'small'}
                color={filter === 'completed' ? 'primary' : 'default'}
                variant={filter === 'completed' ? 'outlined' : 'contained'}
                onClick={onClickCompleted}>Completed</Button>
        </div>
    </div>
})


