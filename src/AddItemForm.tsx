import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            setError('Title is required')
        }
        setTitle('')
    }
    return (

        <div>
            <input
                className={error ? 's.error' : ''}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressItem}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div className={'messageError'}>{error}</div>}
        </div>
    )
}