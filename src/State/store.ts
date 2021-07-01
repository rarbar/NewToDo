
import {todoListReducer} from './todoListReducer';
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from './tasksReducer';

const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolist:todoListReducer
})

export const store= createStore(rootReducer)

export type AppRootStateType=ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
