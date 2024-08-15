import './style.css'

function End({won, poke, reset, img}) {
    return (
        <div className='end-screen'>
            <div className='top-text'>
                <div className='first-part'><strong>{won ? 'Great Job' : 'Game Over'}</strong></div>
                <div>The Pokemon was <strong>{poke}</strong></div>
            </div>
            <img 
                style={{width: '200px', height: '200px', borderRadius: '10%'}}
                src={img}>
            </img>
            <div className='end-buttons'>
                <button><strong>POKEMON INFO</strong></button>
                <button onClick={reset}><strong>PLAY AGAIN</strong></button>
            </div>
        </div>
    )
}

export default End