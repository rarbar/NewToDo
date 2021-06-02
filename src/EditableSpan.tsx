import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState(props.title)
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onEdit = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    return (
        editMode
            ? <input
                autoFocus
                value={title}
                onBlur={offEditMode}
                onChange={onChangeTaskTitle}
                onKeyPress={onEdit}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}