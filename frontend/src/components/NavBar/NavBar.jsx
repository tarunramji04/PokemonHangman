import { useState } from 'react'
import Modal from 'react-modal';
import Pokedex from "../Pokedex/Pokedex"
import './style.css'

function NavBar({user, isLoggedIn, onClickLogIn, onClickLogOut, guessed}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPokedexOpen, setIsPokedexOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function togglePokedex() {
        setIsPokedexOpen(true);
        setIsMenuOpen(false);
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
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={togglePokedex}>
                        <strong>Pokedex</strong>
                    </div>
                    <div className="dropdown-item" onClick={handleLogOut}>
                        <strong>Log Out</strong>
                    </div>
                </div>
            )}
            <Pokedex
                user={user}
                numbers={guessed}
                isOpen={isPokedexOpen}
                onRequestClose={() => setIsPokedexOpen(false)}
            />
        </div>
    )
}

export default NavBar
