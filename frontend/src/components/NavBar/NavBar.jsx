import { useState, useEffect, useRef } from 'react'
import Pokedex from "../Pokedex/Pokedex"
import './style.css'

function NavBar({user, isLoggedIn, onClickLogIn, onClickLogOut, guessed}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPokedexOpen, setIsPokedexOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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

    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <div className="nav-bar">
            {isLoggedIn ? (
                <div className="user-circle" onClick={toggleMenu} ref={buttonRef}>
                    <strong>{user.charAt(0)}</strong>
                </div>
            ) : (
                <div className="login-button" onClick={onClickLogIn}>
                    <strong>Log In</strong>
                </div>
            )}
            {isMenuOpen && (
                <div className="dropdown-menu" ref={menuRef}>
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
