import React, { useState, useEffect } from 'react';
import withAuth from '../services/axiosInterceptor.js'; // Import the interceptor function

const axiosInstance = withAuth(); // Create an intercepted Axios instance

const TodoItem = ({ userId, todo }) => {
    const [localTodo, setLocalTodo] = useState(todo)
    const [isLoading, setIsLoading] = useState(false);
    const changeTodoState = async function(todo){
        setIsLoading(true);
        setLocalTodo({ ...localTodo, completed: !localTodo.completed });
        try{
            const response  = await axiosInstance.patch(`/todos/${userId}/${todo._id}/toggle`)
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
