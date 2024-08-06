import { randomPoke } from "../../api"
import { useState, useEffect } from 'react'
import { getUserData } from '../../backendApi'
import pokeball from '../../assets/pokeball.svg';
import pokeballLight from '../../assets/pokeball-light.svg';
import End from '../End/End'
import Login from "../Login/Login";
import Hint from "../Hint/Hint"
import NavBar from "../NavBar/NavBar"
import './style.css'

function Game() {
    const [poke, setPoke] = useState('');
    const [pokeImage, setPokeImage] = useState('');
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getPoke() {
            if (!gameOver && !isLoginModalOpen) {
                const {name, image} = await randomPoke();
                setPoke(name);
                setPokeImage(image);
            }
        }
        getPoke();
    }, [gameOver, isLoginModalOpen]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        }
        console.log(user)
    }, []);

    const word = poke.split("").map(letter => {
        return guessedLetters.includes(letter) ? letter.toUpperCase() : '_';
    })

    let pokeballs = [];
    for (let i = 0; i < 6; i++) {
        pokeballs.push(<img src={i < guessesLeft ? pokeball : pokeballLight} style={
            {width: '20px', height: '20px', margin: '1px'}}></img>)
    }

    const buttons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
        return <button 
                    key={letter}
                    onClick={() => handleGuess(letter.toLowerCase())}
                    style={{ 
                        backgroundColor: guessedLetters.includes(letter.toLowerCase())
                            ? (poke.includes(letter.toLowerCase()) ? '#98fb98' : '#ff9999')
                            : '',
                        width: '35px',
                        height: '35px',
                        margin: '5px'
                    }}
                >
                    <strong>{letter}</strong>
                </button>
    })

    async function fetchUserData(token) {
        const userInfo = await getUserData(token);
        if (userInfo) {
            setUser(userInfo.username);
            setIsLoggedIn(true);
            setIsLoginModalOpen(false);
        } else {
            localStorage.removeItem('token');
        }
    }

    function handleLogin(username) {
        setUser(username);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        resetGame();
    }

    function handleLogOut() {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoginModalOpen(true);
        resetGame();
    }

    function handlePlayAsGuest() {
        setIsLoginModalOpen(false);
        resetGame();
    }

    function handleGuess(letter) {
        // handle with local variables directly because of async nature of setting state
        if (!guessedLetters.includes(letter)) {
            const newGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(newGuessedLetters);
            
            let newGuessesLeft = guessesLeft;
            if (!poke.includes(letter)) {
                newGuessesLeft = guessesLeft - 1;
                setGuessesLeft(newGuessesLeft);
            }
    
            const allLettersGuessed = poke.split("").every(l => newGuessedLetters.includes(l));
            
            if (newGuessesLeft === 0) {
                setGameOver(true);
                setGameWon(false);
            } else if (allLettersGuessed) {
                setGameOver(true);
                setGameWon(true);
            }
        }
    }

    function resetGame() {
        setGuessedLetters([]);
        setGuessesLeft(6);
        setGameOver(false);
        setGameWon(false);
    }

    return (
        <div className='page-container'>
            {!isLoginModalOpen &&<div>
                <NavBar
                    user={isLoggedIn ? user : 'Guest'}
                    isLoggedIn={isLoggedIn}
                    onClickLogIn={() => setIsLoginModalOpen(true)}
                    onClickLogOut={handleLogOut}
                />
            </div>}
            {!isLoginModalOpen && <div className="content-container">
                <div className="box" 
                    style={gameOver ? (gameWon ? {backgroundColor: '#98fb98'} : {backgroundColor: '#ff9999'}) : {}}
                >
                    {gameOver ? (
                        <End
                            won={gameWon}
                            poke={poke.toUpperCase()}
                            reset={resetGame}
                            img={pokeImage}
                        />
                    ) : (
                        <>
                            <div className="word"><strong>{word}</strong></div>
                            <div className="pokeballs">{pokeballs}</div>
                            <div className="letters">{buttons}</div>
                            <div className="hint-button-container">
                                <button onClick={() => setIsImageModalOpen(true)}><strong>HINT</strong></button>
                            </div>
                        </>
                    )}
                </div>
            </div>}
            <Login
                isOpen={isLoginModalOpen}
                onRequestClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
                onPlayAsGuest={handlePlayAsGuest}
            />
            <Hint
                isOpen={isImageModalOpen}
                onRequestClose={() => setIsImageModalOpen(false)}
                image={pokeImage}
            />
        </div>
    )
}

export default Game
