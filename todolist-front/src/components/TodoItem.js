import React, { useState, useEffect } from 'react';
import axios from 'axios'

const TodoItem = ({ userId, todo }) => {
    const [localTodo, setLocalTodo] = useState(todo)
    const [isLoading, setIsLoading] = useState(false);
    const changeTodoState = async function(todo){
        setIsLoading(true);
        setLocalTodo({ ...localTodo, completed: !localTodo.completed });
        try{
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${userId}/${todo._id}/toggle`)
            console.log(response.data)
            setLocalTodo(response.data)
        } catch (err){
            console.error(err)
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(()=>{
        setLocalTodo(todo)
    },[])
    return (
        <li key={localTodo.text} className="todo-item">
            <span className="todo-text" style={{ textDecoration: localTodo.completed ? 'line-through' : 'none'}}>{localTodo.text}</span>
            <input type="checkbox" 
            checked={localTodo.completed}
            disabled={isLoading} 
            onChange={() => {
                changeTodoState(localTodo)
            }} />
        </li>
    )
}

export default TodoItem;
