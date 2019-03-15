import React from "react";
import {connect} from "react-redux";
import TodoList from "../views/TodoList";
import {
    addTask, addTaskTitle,
    createTask,
    getTasks,
    setStatus,
    setTasks,
    statuses
} from "../../redux/TodoListReducer";
import * as axios from "axios";

let TodoListContainer = class extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTasks();
    }

    render () {
       return <TodoList {...this.props}/>
    }
};

let mapStateToProps = (state) => {
    return {
        tasks: state.todoList.tasks,
        status: state.todoList.status,
        newTaskTitle: state.todoList.newTaskTitle
    }
};

let mapDispatchToProps = (dispatch) => {
    return {

        getTasks: ()=> {
            getTasks(dispatch);
        },
        onTasksCreated: (title) => {
            dispatch(createTask(title));
        },
        addTaskTitle: (title, id) => {
            dispatch(addTaskTitle(title, id))
        }
    }
};

TodoListContainer = connect (mapStateToProps, mapDispatchToProps) (TodoListContainer);
export default TodoListContainer;