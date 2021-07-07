import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './State/store';
import AppWitheRedux from './AppWitheRedux';

ReactDOM.render(
        <Provider store={store}>
            <AppWitheRedux/>
        </Provider>,
    document.getElementById('root')
);

