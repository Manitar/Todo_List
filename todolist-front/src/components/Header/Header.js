import './Header.css'; // Import the CSS file

function Header({title}){


    return (
        <div className="header">
            <div className="header-text">
                {title}
            </div>
        </div>
    )
}

export default Header;