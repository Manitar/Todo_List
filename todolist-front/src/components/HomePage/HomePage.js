// HomePage.js
import React from 'react';
import TodoList from '../TodoList/TodoList';
import { useAuth } from '../../context/AuthProvider';

function HomePage() {
  const { userId } = useAuth();
  console.log(`Homepage: userId is ${userId}`)
  return (
    <div>
      <div>
        <TodoList userId={userId} />
      </div>
    </div>
  );
}

export default HomePage;
