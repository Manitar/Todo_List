import React, { useState, useEffect } from 'react';
import axios from 'axios'

const TodoItem = ({ userId, todo }) => {
    const [localTodo, setLocalTodo] = useState(todo)
    const changeTodoState = async function(todo){
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${userId}/${todo.id}/complete`, {completed: !todo.completed})
        console.log(response.data)
        setLocalTodo(response.data)
    }

    useEffect(()=>{
        setLocalTodo(todo)
    },[])
    return (
        <li key={localTodo.text} className="todo-item">
            <span className="todo-text" style={{ textDecoration: localTodo.completed ? 'line-through' : 'none'}}>{localTodo.text}</span>
            <input type="checkbox" checked={localTodo.completed} onChange={() => {
                changeTodoState(localTodo)
            }} />
        </li>
    )
}

export default TodoItem;
