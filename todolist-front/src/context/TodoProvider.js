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


  // const deleteTodo = (todoId) => {
  //   setTodos(todos.filter(todo => todo._id !== todoId));
  // };

  const deleteTodo = async function(todoId){
    try{
        const response = await axiosInstance.delete(`/todos/${userId}/${todoId}`)
        console.log(response.data)
        if(response.status === 204){
          setTodos(todos.filter(todo => todo._id !== todoId));
          return response.status
        } 
    } catch (err){
      console.error(err)      
    }
}


  const updateTodoOrder = (draggedIndex, hoverIndex) => {
    // Create a copy of the todos array
    const newTodos = [...todos];
  
    // Remove the dragged item from its original position
    const [removed] = newTodos.splice(draggedIndex, 1);
  
    // Insert the removed item at the new position
    newTodos.splice(hoverIndex, 0, removed);
  
    // Update the state with the reordered todos
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo, deleteTodo, updateTodoOrder }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodos = () => useContext(TodoContext);

export { TodoProvider, useTodos };
