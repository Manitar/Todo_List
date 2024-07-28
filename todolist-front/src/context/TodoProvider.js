import React, { createContext, useContext, useState, useEffect } from 'react';
import withAuth from '../services/axiosInterceptor.js'
import {useAuth} from './AuthProvider.js'


const TodoContext = createContext();

const TodoProvider = ({ children }) => {

    const axiosInstance = withAuth();
    const { userId } = useAuth();
    
  const [todos, setTodos] = useState([]);


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

  useEffect(() => {
    fetchTodos();
  }, [userId]);

  const addTodo = async function(todo){
    setTodos([...todos, todo]);
  };


  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
};

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodos = () => useContext(TodoContext);

export { TodoProvider, useTodos };
