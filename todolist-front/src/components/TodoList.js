import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem'
import withAuth from '../services/axiosInterceptor.js'; // Import the interceptor function

const axiosInstance = withAuth(); // Create an intercepted Axios instance

const TodoList = ({ userId }) => {
    console.log(userId)
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        if (!userId) return; // Skip fetching if userId is not available
        try{
            const response = await axiosInstance.get(`/todos/${userId}`)
            console.log(response.data)
            setTodos(response.data)
        } catch (error){
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchTodos()
    }, [userId])

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo._id} userId={userId} todo={todo}  />
            ))}
        </ul>
    )
}

export default TodoList;
