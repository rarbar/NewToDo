import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickAddItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressItem}
                label={'New name'}
                error={!!error}
                helperText={error && 'Title is required'}
            />
            <IconButton onClick={onClickAddItem} >
                <AddBox/>
                </IconButton>

        </div>
)
}