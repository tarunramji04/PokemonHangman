import { getPokemonImage } from "../../api"
import Modal from 'react-modal';
import './style.css'

function Pokedex({user, numbers, isOpen, onRequestClose}) {
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    let images = [];
    for (let i = 0; i < sortedNumbers.length; i++) {
        let img = getPokemonImage(sortedNumbers[i]);
        images.push(<img src={img} style={{width: '80px', height: '80px', margin: '10px'}}></img>)
    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#f3f3f3'
                }
            }}>
            <div className="dex-container">
                <h1><strong>{user}'s POKEDEX</strong></h1>
                <div className="pokedex">
                    {images.length == 0 ? <div className="nothing-text"><i>Play to collect a Pokedex</i></div> : images}
                </div>
            </div>
        </Modal>
    )
}

export default Pokedex
