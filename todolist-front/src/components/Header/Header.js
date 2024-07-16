import './Header.css'; // Import the CSS file
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate('/login');  // Navigate to the login page
    }
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Button 
          color="inherit"
          onClick = {handleLoginClick}>Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;