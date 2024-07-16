import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Header from '../Header/Header.js'
import './LoginPage.css'; // Import the CSS file

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });


function LoginPage() {
    const navigate = useNavigate()
    async function handleSubmit(values, { setSubmitting }) {
        try{
            const loginResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, values)
            console.log('Logging in with:', values);
            setSubmitting(false); // Set submitting to false after submission
            navigate('/'); // Redirect to the home page
        } catch(err){
            console.error(err)
        }
        
    };
    return (
      <div>
        <Header title="Login Page" />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="login-input"
              />
              <ErrorMessage name="email" component="div" className="error" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="login-input"
              />
              <ErrorMessage name="password" component="div" className="error" />
              <button type="submit" disabled={isSubmitting} className="login-button">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );  
}

export default LoginPage;
