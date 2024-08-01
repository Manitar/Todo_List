import React, { useState, useEffect } from 'react';
import withAuth from '../../services/axiosInterceptor.js';
import { useDrag } from 'react-dnd';
import { useTodos } from '../../context/TodoProvider.js';
import './TodoItem.css';


const axiosInstance = withAuth();

const TodoItem = ({ userId, todo , onDelete, index}) => {
    const { deleteTodo } = useTodos();
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'TODO_ITEM', // Define your drag item type
        item: { id: todo._id, index }, // Data associated with the dragged item
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }));    
      
    const [localTodo, setLocalTodo] = useState(todo)
    const [isLoading, setIsLoading] = useState(false);
    const changeTodoState = async function(todo){
        setIsLoading(true);
        setLocalTodo({ ...localTodo, completed: !localTodo.completed });
        try{
            const response = await axiosInstance.patch(`/todos/${userId}/${todo._id}/toggle`)
            console.log(response.data)
            setLocalTodo(response.data)
        } catch (err){
            console.error(err)
        } finally {
            setIsLoading(false);
        }

    }

    const handleDelete = async function(onDelete){
        try{
            const response = await deleteTodo(localTodo._id)
            if(response.status === 204){
                onDelete(localTodo._id)
            } 
        } catch (err){
          console.error(err)      
        }
    }

    useEffect(()=>{
        setLocalTodo(todo)
    },[])

    if (!localTodo) return null; // Do not render if the todo is null

    return (
        <div
        ref={dragRef}
        className={`todo-item ${localTodo.completed ? 'completed' : 'uncompleted'}`}>
            <div
            className="todo-item-start">
            <input type="checkbox" 
             checked={localTodo.completed}
             disabled={isLoading} 
             onChange={() => {
                 changeTodoState(localTodo)
             }} />
                <div
                className="todo-text ellipsis">
                    {localTodo.text}
                </div>
            </div>
            <div
            className="todo-item-settings-button"
            onClick={handleDelete}>
                <img src='/images/trash-red.svg'/>
            </div>
        </div>
    )
}

export default TodoItem;
