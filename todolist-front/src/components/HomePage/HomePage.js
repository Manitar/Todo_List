import React, { useEffect, useState } from 'react';
import TodoList from '../TodoList';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate()

    const handleToken = function(){
        const token = localStorage.getItem('jwtToken');
        console.log("Token:", token);
        
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Convert to seconds

                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true);
                    setUserId(decodedToken.userId); // Assuming the JWT contains a userId claim
                } else {
                    // Token has expired
                    handleLogout();
                }
            } catch (error) {
                console.error("Invalid token: ", error);
                handleLogout();
            }
        }
    }
    useEffect(() => {
        handleToken()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <Button onClick={handleLogout}>Logout</Button>
                    <TodoList userId={userId} />
                </div>
            ) : (
                <Navigate to="/login" replace />
            )}
        </div>
    );
}

export default HomePage;