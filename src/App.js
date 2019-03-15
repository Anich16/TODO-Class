import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./ui/views/TodoList.js";
import TodoListContainer from "./ui/containers/TodoListContainer.js";

class App extends Component {
  render() {
    return (
      <TodoListContainer />
    );
  }
}

export default App;
