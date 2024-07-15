import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo }) => {
    return (
        <li key={todo._id} className="todo-item">
            <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
            <input type="checkbox" checked="todo.completed" onChange={() => {

            }} />
        </li>
    )
}

export default TodoItem;
