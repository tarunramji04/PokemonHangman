import { randomWord } from "../../api"
import { useState } from 'react'
import pokeball from '../../assets/pokeball.svg';
import pokeballLight from '../../assets/pokeball-light.svg';
import './style.css'

function Game() {
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);

    const word = randomWord().split("").map(letter => {
        return guessedLetters.includes(letter) ? letter : '_';
    })

    let pokeballs = [];
    for (let i = 0; i < 6; i++) {
        pokeballs.push(<img src={i < guessesLeft ? pokeball : pokeballLight}></img>)
    }
    console.log(pokeballs)

    const letters = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
        return <button className="chars">{letter}</button>
    })

    return (
        <div className="box">
            {word}
            {pokeballs}
            {letters}
        </div>
    )
}

export default Game
