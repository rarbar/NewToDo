import {TaskStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todoListReducer';

type RemoveTaskAT = {
    type: 'REMOVE-TASK',
    todoListId: string
    id: string
}
type AddTaskAT = {
    type: 'ADD-TASK',
    todoListId: string
    title: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS',
    taskID: string
    isDone: boolean
    todoListId: string
}
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string
    title: string
    todoListId: string
}

export type ActionTypes =
    RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
export let todoListId1 = v1()
export let todolistID2 = v1()

const initialState={
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            { id: v1(), title: "bread", isDone: false },
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "tea", isDone: false }
        ]
    }


export const tasksReducer = (state: TaskStateType=initialState, action: ActionTypes):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const todolistTask = stateCopy[action.todoListId]
            //state[action.todoListId] = todolistTask.filter(t => t.id !== action.id)
            const newTasks = todolistTask.filter(t => t.id !== action.id)
            stateCopy[action.todoListId] = newTasks
            //у нужного нам массива, переприсвоится на новый отфильтрованный массив
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            //присваиваем stateCopy копию с помощью спрет оператора state
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            //присваиваем newTask новый обьект
            const todolistTask = stateCopy[action.todoListId]
            //присваиваем todolistTask массив к которому обращаемся через action
            stateCopy[action.todoListId] = [newTask, ...todolistTask]
            //в массив который мы взяли добавляем newTask и копию что у него лежало
            return stateCopy
            //возвращаем новый stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const todolistTask = state[action.todoListId]
            stateCopy[action.todoListId] = todolistTask.map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const todolistTask = state[action.todoListId]
            stateCopy[action.todoListId] = todolistTask.map(t => t.id === action.taskID ? {
                ...t,
                title: action.title
            } : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE-TASK',
        id,
        todoListId  // типизируется из парраметра
    }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskAT => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId  // типизируется из парраметра
    }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListId: string): changeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todoListId  // типизируется из парраметра
    }
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): changeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID,
        title,
        todoListId  // типизируется из парраметра
    }
}