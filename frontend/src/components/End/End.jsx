import './style.css'

function End(props) {
    return (
        <div className='end-screen'>
            <div className='top-text'>
                <div className='first-part'><strong>{props.won ? 'Great Job' : 'Game Over'}</strong></div>
                <div>The Pokemon was <strong>{props.poke}</strong></div>
            </div>
            <img 
                style={{width: '200px', height: '200px', borderRadius: '10%'}}
                src={props.img}>
            </img>
            <div className='end-buttons'>
                <button><strong>POKEMON INFO</strong></button>
                <button onClick={props.reset}><strong>PLAY AGAIN</strong></button>
            </div>
        </div>
    )
}

export default End