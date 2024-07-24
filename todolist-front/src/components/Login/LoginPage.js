import React from 'react';
import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthProvider'; // Import useAuth
import './LoginPage.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState('login')
  const { handleLogin, handleRegister } = useAuth(); // Get handleLogin from context

  async function handleSubmit(values, { setSubmitting, setFieldError }){
    if(pageState === 'login'){
      await handleSubmitLogin(values, { setSubmitting, setFieldError })
    } else {
      await handleSubmitRegister(values, { setSubmitting, setFieldError })
      setPageState('login')
    }
  }

  async function handleSubmitLogin(values, { setSubmitting, setFieldError }) {
    try {
      console.log('Calling handleLogin with values:', values); // Log the values
      await handleLogin(values, navigate);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setFieldError('email', err.response.data.message);
      } else {
        setFieldError('email', 'An error occurred during login');
      }
      setSubmitting(false);
    }
  }

  async function handleSubmitRegister(values, { setSubmitting, setFieldError }){
    try {
      console.log('Calling handleRegister with values:', values); // Log the values
      await handleRegister(values, navigate);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setFieldError('email', err.response.data.message);
      } else {
        setFieldError('email', 'An error occurred during register');
      }
      setSubmitting(false);
    }
  }

  const togglePageState = function(){
    setPageState(pageState === 'login' ? 'register' : 'login')
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <div className="input-group">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="login-input"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="input-group">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="login-input"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <a
            onClick={togglePageState}
            className="toggle-button">
          {pageState === 'login' ? 'No account? Register here!' : 'Already have an account? Login here!'}
          </a>
          <button type="submit" disabled={isSubmitting} className="login-button">
            {pageState === 'login' ? 'Login' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
