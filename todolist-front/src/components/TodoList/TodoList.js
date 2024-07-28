import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem.js'
import { Button } from '@mui/material';
import withAuth from '../../services/axiosInterceptor.js'; // Import the interceptor function
import './TodoList.css';
import { useTodos } from '../../context/TodoProvider.js';

const axiosInstance = withAuth(); // Create an intercepted Axios instance

const TodoList = ({ userId }) => {
    console.log(userId)
    const { todos, fetchTodos, deleteTodo } = useTodos();


    // const addMockTodoItem = async function(){
    //     try{
    //         const todoToAdd = {
    //             userId: userId,
    //             text: "Mock Todo"
    //         }
    //         const response = await axiosInstance.post(`/todos/${userId}`, todoToAdd)
    //         if(response.status === 201){
    //             setTodos([...todos, todoToAdd]);
    //         }
    //     } catch (err){
    //         console.error(err)
    //     }
    // }

    useEffect(()=>{
        fetchTodos()
    }, [userId])

    return (
        <div
        className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo._id} userId={userId} todo={todo} onDelete={deleteTodo} />
            ))}
        </div>
    )
}

export default TodoList;
