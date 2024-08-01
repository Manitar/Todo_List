import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem.js';
import { Button } from '@mui/material';
import withAuth from '../../services/axiosInterceptor.js'; // Import the interceptor function
import './TodoList.css';
import { useTodos } from '../../context/TodoProvider.js';
import { useDrop } from 'react-dnd';  // Import useDrop

const axiosInstance = withAuth(); // Create an intercepted Axios instance

const TodoList = ({ userId }) => {
  console.log(userId);
  const { todos, fetchTodos, deleteTodo, updateTodoOrder } = useTodos();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchTodos();
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'TODO_ITEM',
    drop: async function(item, monitor){
      const draggedIndex = monitor.getItem().index;
      await fetchTodos()
      const hoverIndex = todos.indexOf(item);
      if (draggedIndex !== hoverIndex) {
        updateTodoOrder(draggedIndex, hoverIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef} className={`todo-list ${isOver ? 'hovering' : ''}`}>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching todos: {error.message}</p>
      ) : (
        todos.length > 0 ? (
          todos.map((todo, index) => (
            <TodoItem key={`${todo._id}-${index}`} userId={userId} todo={todo} onDelete={deleteTodo} index={index} />
          ))
        ) : (
          <p>No todos found</p>
        )
      )}
    </div>
  );
};

export default TodoList;
