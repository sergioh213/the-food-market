import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome'
import axios from './axios'
import App from './App'
import { Provider } from 'react-redux';
import reducer from './redux-socket/reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { init } from './redux-socket/socket'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />
} else {
    component = (
        <Provider store={ store }>
            <App />
        </Provider>
    );
    init(store)
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
