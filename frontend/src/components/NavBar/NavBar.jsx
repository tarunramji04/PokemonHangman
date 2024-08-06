import { useState } from 'react'
import './style.css'

function NavBar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="nav-bar">
            <div className="nav-menu" onClick={toggleMenu}>
                {props.isLoggedIn ? (
                    <div className="user-circle">
                        <strong>{props.user.charAt(0)}</strong>
                    </div>
                ) : (
                    <div className="login-button" onClick={props.onClickLogIn}>
                        <strong>Log In</strong>
                    </div>
                )}
            </div>
            {isMenuOpen && props.isLoggedIn && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <strong>Pokedex</strong>
                    </div>
                    <div className="dropdown-item" onClick={props.onClickLogOut}>
                        <strong>Log Out</strong>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar
