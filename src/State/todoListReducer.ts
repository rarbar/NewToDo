import {FilterValueType} from '../App';
import {v1} from 'uuid';
import {todoListId1, todolistID2} from './tasksReducer';
import {TodoListType} from '../AppWitheReducer';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string

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



const initialState:TodoListType[]=[
    {id: todoListId1, title: 'What to leurn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todoListReducer = (todolist:TodoListType[]=initialState, action: ActionTypes):TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return todolist.filter(tl => tl.id !== action.todoListID)

        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todolist, newTodoList]

        case 'CHANGE-TODOLIST-FILTER':
            return todolist.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)

        case 'CHANGE-TODOLIST-TITLE':
            return todolist.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)

        default:
            return todolist   //всегда ставим default в switch ,case
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID  // типизируется из парраметра
    }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        todoListId: v1(),
        title // типизируется из парраметра
    }
}
export const changeTodoListFilterAC = (filter: FilterValueType, todolistID: string): ChangeTodoListFiltertAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistID
    }
}
export const changeTodoListTitleAC = (title: string, todolistID: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistID,
    }
}