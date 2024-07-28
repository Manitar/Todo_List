import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem.js'
import withAuth from '../../services/axiosInterceptor.js'; // Import the interceptor function
import './TodoList.css';

const axiosInstance = withAuth(); // Create an intercepted Axios instance

const TodoList = ({ userId }) => {
    console.log(userId)
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        if (!userId) return; // Skip fetching if userId is not available
        try{
            console.log(`Token = ${localStorage.getItem('jwtToken')}`)
            const response = await axiosInstance.get(`/todos/${userId}`)
            console.log(response.data)
            setTodos(response.data)
        } catch (error){
            console.error(error)
        }
    }

    const handleDelete = (todoId) => {
        setTodos(todos.filter(todo => todo._id !== todoId));
    };

    const addMockTodoItem = async function(){
        try{
            const todoToAdd = {
                userId: userId,
                text: "Mock Todo"
            }
            const response = await axiosInstance.post(`/todos/${userId}`, todoToAdd)
            if(response.status === 201){
                setTodos([...todos, todoToAdd]);
            }
        } catch (err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchTodos()
    }, [userId])

    return (
        <div
        className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo._id} userId={userId} todo={todo} onDelete={handleDelete} />
            ))}
            <button className="add-todo-button" onClick={addMockTodoItem}>Add Mock Todo</button>
        </div>
    )
}

export default TodoList;
