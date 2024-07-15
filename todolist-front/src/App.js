import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import axios from 'axios'

function App() {
  const [userId, setUserId] = useState(null); // Replace with logic to get user ID
  const loginUrl = `${process.env.REACT_APP_SERVER_URL}/users/login`
  const data = {
    email: "email@email.com",
    password: "123456"
  }
  const loginUser = async function(email, password){
    const response = await axios.post(loginUrl, {email, password})
    setUserId(response.data.userId)
  }

  useEffect(() => {
    console.log("App is up and running")
    loginUser(data.email, data.password)
  }, [])

  return (
    <div className="App">
      {userId && <TodoList userId={userId} />}
    </div>
  );
}

export default App;