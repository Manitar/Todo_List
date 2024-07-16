import TodoList from '../TodoList';
import { Navigate } from 'react-router-dom';

function HomePage() {
    const isAuthenticated = false;
    const userId = "6694e6789e44a7dfdfaadf54"
  
    return (
        <div>
            {isAuthenticated ? (
                <div>{<TodoList userId={userId} />}</div>
            ) : (
              <Navigate to="/login" replace />
            )}
        </div>
    );
}

export default HomePage;

