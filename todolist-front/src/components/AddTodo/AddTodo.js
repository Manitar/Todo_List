import React from 'react';
import {useState} from 'react';
import {Button} from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import withAuth from '../../services/axiosInterceptor.js';
import { useTodos } from '../../context/TodoProvider.js';
import './AddTodo.css'

const TodoSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const axiosInstance = withAuth();

function AddTodo({userId}) {

    const [showAddTodoForm, setShowAddTodoForm] = useState(false);
    const {addTodo } = useTodos();

    const handleAddTodoClicked = () => {
        // Update state directly here
        setShowAddTodoForm(!showAddTodoForm);
    };

    async function handleSubmit(values, { setSubmitting, setFieldError }){
        try {
          console.log('Calling handleSubmit with values:', values); // Log the values
          const response = await axiosInstance.post(`/todos/${userId}`, values)
          if(response.status === 201){
            addTodo(response.data)
            setShowAddTodoForm(false)
          }
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
      }

  return (
    <div>
        <div
        className="add-todo-button">
        <Button
          variant="contained"
          onClick={handleAddTodoClicked}
        >
          Add Todo
        </Button>
      </div>
      {showAddTodoForm && (
         <Formik
         initialValues={{ text: '' }}
         validationSchema={TodoSchema}
         onSubmit={handleSubmit}
         >
         {({ isSubmitting }) => (
             <Form className="todo-form">
             <div className="input-group">
                 <Field
                 name="text"
                 type="text"
                 placeholder="Enter text here"
                 className="text-input"
                 />
             </div>
             <Button variant="contained" color="success" type="submit" disabled={isSubmitting}>
                 Create
             </Button>
             </Form>
         )}
         </Formik>
      )}
       
    </div>
  );
}

export default AddTodo;
