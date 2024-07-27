import { randomPoke } from "../../api"
import { useState, useEffect } from 'react'
import pokeball from '../../assets/pokeball.svg';
import pokeballLight from '../../assets/pokeball-light.svg';
import './style.css'

function Game() {
    const [poke, setPoke] = useState('')
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false)

    useEffect(() => {
        async function getPoke() {
            if (!gameOver) {
                const pokemonName = await randomPoke();
                setPoke(pokemonName);
            }
        }
        getPoke();
    }, [gameOver]);

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

    function handleGuess(letter) {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters(prev => [...prev, letter]);
            if (!poke.includes(letter)) {
                setGuessesLeft(prev => prev - 1)
            }
        }
        checkGameOver();
    }

    function checkGameOver() {
        if (guessesLeft === 0) {
            setGameOver(true);
        }
        if (guessedLetters.length === poke.length) {
            setGameOver(true);
            setGameWon(true);
        }
    }

    function resetGame() {
        setGuessedLetters([]);
        setGuessesLeft(6);
        setGameOver(false);
        setGameWon(false);
    }

    return (
        <div className="box-left">
            <div className="word"><strong>{word}</strong></div>
            <div className="pokeballs">{pokeballs}</div>
            <div className="letters">{buttons}</div>
        </div>
    )
}

export default Game
