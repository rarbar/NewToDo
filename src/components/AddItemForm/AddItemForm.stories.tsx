import React from 'react'
import {action} from '@storybook/addon-actions'
import {AddItemForm} from './AddItemForm'

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm
}

const asyncCallback = async (...params: any[]) => {
    action('Button inside form clicked')(...params);
}

export const AddItemFormBaseExample = () => {
    return (<AddItemForm
        addItem={asyncCallback}
    />)
}



