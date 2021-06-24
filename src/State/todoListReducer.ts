import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
 export type AddTodoListAT = {
    type:'ADD-TODOLIST'
    title:string
     todoListId:string

}
type ChangeTodoListFiltertAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    todolistID: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistID: string
}
export type ActionTypes = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFiltertAT | ChangeTodoListTitleAT

export const todoListReducer = (todoList: TodoListType[], action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return todoList.filter(tl => tl.id !== action.todoListID)

        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todoList, newTodoList]

        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)

        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)

        default:
            return todoList   //всегда ставим default в switch ,case
    }
}

export const removeTodoListAC = (todoListID:string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID  // типизируется из парраметра
    }
}
export const addTodoListAC = (title:string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        todoListId:v1(),
        title // типизируется из парраметра
    }
}
export const changeTodoListFiltertAC = (filter: FilterValueType, todolistID: string): ChangeTodoListFiltertAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistID
    }
}
export const changeTodoListTitletAC = (title:string, todolistID: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistID,
    }
}