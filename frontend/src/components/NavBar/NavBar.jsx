import { useState } from 'react'
import './style.css'

function NavBar({user, isLoggedIn, onClickLogIn, onClickLogOut}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleLogOut() {
        if (localStorage.getItem("token") != null) {
            localStorage.removeItem("token");
        }
        onClickLogOut();
    }

    return (
        <div className="nav-bar">
            {isLoggedIn ? (
                <div className="user-circle" onClick={toggleMenu}>
                    <strong>{user.charAt(0)}</strong>
                </div>
            ) : (
                <div className="login-button" onClick={onClickLogIn}>
                    <strong>Log In</strong>
                </div>
            )}
            {isMenuOpen && isLoggedIn && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <strong>Pokedex</strong>
                    </div>
                    <div className="dropdown-item" onClick={handleLogOut}>
                        <strong>Log Out</strong>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar
