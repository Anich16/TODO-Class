import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import TodoListReducer from "./redux/TodoListReducer.js";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

let reducers = combineReducers({
    todoList: TodoListReducer
});

let midlewares = applyMiddleware(thunk);

let store = createStore(reducers, midlewares);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
