import React from "react";
import style from "./TodoList.module.css";
import {statuses} from "../../redux/TodoListReducer";


let TodoList = (props) => {
    let {tasks = []} = props;

    let onKeyUp = (e) => {
        if (e.keyCode == 13) {
            props.onTasksCreated(e.target.value);

        }
    };

    let changeTaskTitle =(e) => {

        props.addTaskTitle(e.target.value);
    };

    return <div className={style.todoListBlock}>
        <div className={style.status}>
            Status: {props.status}
        </div>
        <div className={style.form}>
            <input type="text" placeholder="What needs to be done?"
                   onKeyUp={onKeyUp} disabled={props.status === statuses.IN_PROGRESS}
                    value={props.newTaskTitle} onChange={changeTaskTitle}
                    className={style.field}/>
        </div>
        <div className={style.list}>
            <ul>
                {tasks.map((el) => <li className={style.item} key={el.id}>{el.title}</li>)}
                {tasks.length === 0 && <span>No tasks</span>}
            </ul>
        </div>
    </div>
};

export default TodoList;
