import React from "react";
import {connect} from "react-redux";
import TodoList from "../views/TodoList";
import {
    addTask, addTaskTitle,
    createTask, deleteTaskAC,
    getTasks,
    setStatus,
    setTasks,
    statuses, todoSelector
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
        tasks: todoSelector(state),
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
        },
        deleteTask: (id) => {
            dispatch(deleteTaskAC(id))
        }
    }
};

TodoListContainer = connect (mapStateToProps, mapDispatchToProps) (TodoListContainer);
export default TodoListContainer;