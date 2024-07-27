import { randomPoke } from "../../api"
import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import pokeball from '../../assets/pokeball.svg';
import pokeballLight from '../../assets/pokeball-light.svg';
import End from '../End/End'
import './style.css'

function Game() {
    const [poke, setPoke] = useState('');
    const [pokeImage, setPokeImage] = useState('');
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function getPoke() {
            if (!gameOver) {
                const {name, image} = await randomPoke();
                setPoke(name);
                setPokeImage(image);
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
                        <button onClick={() => setIsModalOpen(true)}><strong>HINT</strong></button>
                    </div>
                </>
            )}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                    }
                }}>
                <img 
                    style={{width: '150px', height: '150px'}}
                    src={pokeImage}>
                </img>
            </Modal>
        </div>
    )
}

export default Game
