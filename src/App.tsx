import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


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

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to leurn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
            {id: v1(), title: 'Beef', isDone: false}
        ]
    })

    function removeTask(id: string, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask = tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отфильтрованными массивами
        tasks[todoListID] = todolistTask.filter(t => t.id !== id)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }
    function addNewTask(title: string, todoListID: string) {
        // создаем новую таску
        let newTask = {id: v1(), title, isDone: false}
        // достаем нужный массив по todoListID
        let todolistTask = tasks[todoListID]
        // перезапишим в этом обьекте массив для нужнрго нам TD добавив новую таску
        tasks[todoListID] = [newTask, ...todolistTask]
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask = tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отмапив его меняя isDone
        tasks[todoListID] = todolistTask.map(t => t.id === taskID ? {...t, isDone} : t)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask = tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отмапив его меняя title
        tasks[todoListID] = todolistTask.map(t => t.id === taskID ? {...t, title} : t)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeTodoListFilter(filter: FilterValueType, todolistID: string) {
        setTodoList(todoList.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }
    function changeTodoListTitle(title: string, todolistID: string) {
        setTodoList(todoList.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }
    function removeTodoList(todoListID: string) {
        // засуним в стейт список TD, id которых не равны тому который хотим вакинуть
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        //удалим и таски из второго стейта
        delete tasks[todoListID]
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoList([...todoList, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    function getFilterTasks(tl: TodoListType) {
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => t.isDone)
            case 'completed':
                return tasks[tl.id].filter(t => !t.isDone)
            default:
                return tasks[tl.id]
        }
    }
    const todoListComponents = todoList.map(tl => {
            const taskForTodoList = getFilterTasks(tl)
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
                            tasks={taskForTodoList}
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
                <IconButton edge="start"  color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    TodoList
                </Typography>
                <Button color="inherit" style={{
                    position: 'absolute', right: '10px'}}>Login </Button>
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

export default App;
