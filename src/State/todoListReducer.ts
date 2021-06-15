import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListAT = {
    type:'ADD-TODOLIST'
    title:string

}
type ChangeTodoListFiltertAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    todolistID: string
}
type ChangeTodoListTitletAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistID: string
}
export type ActionTypes = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFiltertAT | ChangeTodoListTitletAT

export const todoListReducer = (todoList: TodoListType[], action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.todoListID)

        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID,
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

export const RemoveTodoListAC = (todoListID:string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID  // типизируется из парраметра
    }
}
export const AddTodoListAC = (title:string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title // типизируется из парраметра
    }
}
export const ChangeTodoListFiltertAC = (filter: FilterValueType,todolistID: string): ChangeTodoListFiltertAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistID
    }
}
export const ChangeTodoListTitletAC = (title:string,todolistID: string): ChangeTodoListTitletAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistID,
    }
}