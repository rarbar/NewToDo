import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './State/store';
import AppWitheReducer from './AppWitheReducer';

ReactDOM.render(
        <Provider store={store}>
            <AppWitheReducer/>
        </Provider>,
    document.getElementById('root')
);

