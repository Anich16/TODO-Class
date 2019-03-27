import * as axios from "axios";

const ADD_TASK ="TODOLIST/TODOLIST/ADD_TASK";
const DELETE_TASK = "TODOLIST/TODOLIST/DELETE_TASK";
const CHANGE_TASK_TITLE = "TODOLIST/TODOLIST/CHANGE_TASK_TITLE";
const CHANGE_TASK_COMPLETE_STATUS = "TODOLIST/TODOLIST/CHANGE_TASK_COMPLETE_STATUS";
const SET_TASKS = "TODOLIST/TODOLIST/SET_TASKS";
const SET_STATUS = "TODOLIST/TODOLIST/SETSTATUS";
const ADD_TASK_TITLE ="TODOLIST/TODOLIST/ADD_TASK_TITLE";

export let statuses = {
    NOT_INIT: "NOT-INITIALIZED",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    IN_PROGRESS: "IN-PROGRESS"
};

let initialState = {
    tasks: {},
    newTaskTitle: "",
    id: 1,
    current: 1,
    status: statuses.NOT_INIT
};

let TodoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            let tasks = {};
            action.tasks.forEach(t => {
                tasks[t.id] = t;
        });
            return {...state, tasks: tasks};
        case ADD_TASK:
            return {...state,
                tasks: {
                ...state.tasks,
                    [action.task.id] : action.task}};
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_TASK:
            let copy = {...state,
                tasks: {...state.tasks}
            };
            delete copy.tasks[action.id];
            return copy;
        case ADD_TASK_TITLE:
            return {...state, newTaskTitle: action.title, id: ++state.current};
        default:
            return state;
    }
};

export let getTasks =() => (dispatch) => {
    dispatch(setStatus(statuses.IN_PROGRESS));

    axios
        .get("https://repetitora.net/api/JS/Tasks?widgetId=74628")
        .then(res =>
            dispatch(setTasks(res.data)));
    dispatch(setStatus(statuses.SUCCESS))
};

export let deleteTask =(id) => (dispatch) => {
    dispatch(setStatus(statuses.IN_PROGRESS));

    axios
        .delete("https://repetitora.net/api/JS/Tasks?widgetId=74628&taskId=" + id)
        .then(res =>
            dispatch(deleteTaskAC(id)));
            dispatch(setStatus(statuses.SUCCESS))
};

export let createTask = (title) => (dispatch) => {
    dispatch(setStatus(statuses.IN_PROGRESS));

    axios
        .post("https://repetitora.net/api/JS/Tasks", {widgetId: 74628, title})
        .then(res => {
            dispatch(addTask(res.data.task));
                dispatch(setStatus(statuses.SUCCESS));
                dispatch(addTaskTitle(""));
        })

};

export let setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        tasks
    }
};

export let setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
};

export let addTask =(task) => {
    return {
        type: ADD_TASK,
        task
    }
};

export let deleteTaskAC = (id) => {
    return {
        type: DELETE_TASK,
        id
    }
};

export let addTaskTitle =(title, id) => {
    return {
        type: ADD_TASK_TITLE,
        title,
        id
    }
};

export let todoSelector = (state) => {
    let tasks = state.todoList.tasks;
    let tasksAsArray = Object.keys(tasks).map(key =>tasks[key]);
    return tasksAsArray;
};


export default TodoListReducer;