import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './State/todoListReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWitheRedux() {

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const todolist = useSelector<AppRootStateType, TodoListType[]>(state => state.todolist)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todoListID: string) => {
        const action = removeTaskAC(id, todoListID)
        dispatch(action)
    }, [dispatch])

    const addNewTask = useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValueType, todolistID: string) => {
        const action = changeTodoListFilterAC(filter, todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todolistID: string) => {
        const action = changeTodoListTitleAC(title, todolistID)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])



    const todoListComponents = todolist.map(tl => {

            return (
                <Grid
                    item
                    key={tl.id}>
                    <Paper elevation={5}
                           style={{padding: '10px'}}>
                        <Todolist
                            filter={tl.filter}
                            title={tl.title}
                            addTask={addNewTask}
                            todolistID={tl.id}
                            tasks={tasks[tl.id]}
                            changeFilter={changeTodoListFilter}
                            changeStatus={changeTaskStatus}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>)
        }
    )
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit" style={{
                        position: 'absolute', right: '10px'
                    }}>Login </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWitheRedux;
