import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


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

    const todoListID1 = v1()
    const todoListID2 = v1()


    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListID1, title: 'What to leurn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
            {id: v1(), title: 'Beef', isDone: false}
        ]
    })

    function removeTask(id: string, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask= tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отфильтрованными массивами
        tasks[todoListID] = todolistTask.filter(t => t.id !== id)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function removeTodoList(todoListID: string) {
        // засуним в стейт список TD, id которых не равны тому который хотим вакинуть
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
            //удалим и таски из второго стейта
        delete tasks[todoListID]
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function addNewTask(title: string, todoListID: string) {
        // создаем новую таску
        let newTask = {id: v1(), title, isDone: false}
        // достаем нужный массив по todoListID
        let todolistTask= tasks[todoListID]
        // перезапишим в этом обьекте массив для нужнрго нам TD добавив новую таску
        tasks[todoListID] = [newTask, ...todolistTask]
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function addTodoList(title:string){
        const newTodoListID=v1()
        const newTodoList:TodoListType={
            id:newTodoListID,
            title,
            filter:'all'
        }
        setTodoList([...todoList,newTodoList])
        setTasks({...tasks,[newTodoListID]:[]})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask= tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отмапив его меняя isDone
        tasks[todoListID] = todolistTask.map(t => t.id === taskID ? {...t, isDone} : t)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeTaskTitle(taskID: string, title:string, todoListID: string) {
        // достаем нужный массив по todoListID
        let todolistTask= tasks[todoListID]
        // перезапишим в этом обьекте массив для нужного TD отмапив его меняя title
        tasks[todoListID] = todolistTask.map(t => t.id === taskID ? {...t, title} : t)
        // засетаем в стейт копию обьекта, что бы react отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeTodoListFilter(filter: FilterValueType, todolistID: string) {
        setTodoList(todoList.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    function changeTodoListTitle(title:string, todolistID: string) {
        setTodoList(todoList.map(tl => tl.id === todolistID ? {...tl,title} : tl))
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
                <Todolist
                    key={tl.id}
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
                />)
        }
    )
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;
