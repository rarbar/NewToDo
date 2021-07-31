import {FC, memo, useCallback} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void


}

export const Todolist: FC<PropsType> = memo(function ({
                                                          id,
                                                          title,
                                                          tasks,
                                                          changeFilter,
                                                          addTask,
                                                          changeTaskStatus,
                                                          changeTaskTitle,
                                                          removeTask,
                                                          removeTodolist,
                                                          changeTodolistTitle,
                                                          filter
                                                      }) {
    console.log('Todolist is called')
    const addTaskCallback = useCallback((title: string) => {addTask(title, id)}, [addTask, id])

    const removeTodolistCallback = () => {removeTodolist(id)}
    const changeTodolistTitleCallback = useCallback((title: string) => {changeTodolistTitle(id, title)}, [id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistCallback}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}/>
        <div>
            {tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTask}
                    todolistId={id}
                    key={t.id}
                />)}
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


