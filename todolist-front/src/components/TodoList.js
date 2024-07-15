import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem'
import axios from 'axios';

const TodoList = ({ userId }) => {
    console.log(userId)
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        if (!userId) return; // Skip fetching if userId is not available
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos/${userId}`)
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
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </ul>
    )
}

export default TodoList;
