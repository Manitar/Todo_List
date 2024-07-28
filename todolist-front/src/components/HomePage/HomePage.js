import React, { useState } from 'react';
import { Button } from '@mui/material';
import TodoList from '../TodoList/TodoList';
import AddTodo from '../AddTodo/AddTodo';
import './HomePage.css';
import { useAuth } from '../../context/AuthProvider';

function HomePage() {
  const { userId } = useAuth();

  return (
    <div>
      <TodoList userId={userId} />
      <AddTodo userId={userId}/>
    </div>
  );
}

export default HomePage;
