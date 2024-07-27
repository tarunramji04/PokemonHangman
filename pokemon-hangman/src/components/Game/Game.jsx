import { randomPoke } from "../../api"
import { useState, useEffect } from 'react'
import pokeball from '../../assets/pokeball.svg';
import pokeballLight from '../../assets/pokeball-light.svg';
import './style.css'

function Game() {
    const [poke, setPoke] = useState('')
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);

    useEffect(() => {
        async function getPoke() {
          const pokemonName = await randomPoke();
          setPoke(pokemonName);
        }
        getPoke();
    }, []);

    const word = poke.split("").map(letter => {
        return guessedLetters.includes(letter) ? letter : '_';
    })

    let pokeballs = [];
    for (let i = 0; i < 6; i++) {
        pokeballs.push(<img src={i < guessesLeft ? pokeball : pokeballLight}></img>)
    }

    const buttons = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
        return <button 
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                    style={{ 
                        backgroundColor: guessedLetters.includes(letter)
                            ? (poke.includes(letter) ? 'green' : 'red')
                            : ''
                    }}
                >
                    {letter}
                </button>
    })

    function handleGuess(letter) {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters(prev => [...prev, letter]);
            if (!poke.includes(letter)) {
                setGuessesLeft(prev => prev - 1)
            }
        }
    }

    return (
        <div className="box">
            {word}
            {pokeballs}
            {buttons}
        </div>
    )
}

export default Game
