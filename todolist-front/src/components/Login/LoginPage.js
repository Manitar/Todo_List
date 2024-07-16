import React from 'react';
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
  const { handleLogin } = useAuth(); // Get handleLogin from context

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    try {
      console.log('Calling handleLogin with values:', values); // Log the values
      await handleLogin(values, navigate);
      console.log('Login completed, navigating to home');
      navigate('/')
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
          <button type="submit" disabled={isSubmitting} className="login-button">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
