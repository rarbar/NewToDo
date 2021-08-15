import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../utils/error-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    let dataPr = await authAPI.login(data)
    try {
        if (dataPr.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dataPr.data, dispatch);
        }
    } catch (error
        ) {
        handleServerNetworkError(error, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {

    dispatch(setAppStatusAC('loading'))
    let prom = await authAPI.logout()
    try {
        if (prom.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(prom.data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType