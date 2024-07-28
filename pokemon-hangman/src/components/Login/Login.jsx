import Modal from 'react-modal';
import pokeball from '../../assets/pokeball.svg';
import { useState } from 'react'
import './style.css'


function Login({isOpen, onRequestClose, onLogin, onPlayAsGuest}) {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    function handleLogin(event) {
        event.preventDefault();
        console.log('Logging in with', username, password);
        onLogin(username);
    };
  
    function handleCreateAccount(event) {
        event.preventDefault();
        console.log('Created account with', username, password);
        onLogin(username);
    };

    let pokeballs = [];
    for (let i = 0; i < 6; i++) {
        pokeballs.push(<img src={pokeball} style={{width: '15px', height: '15px', margin: '1px'}}></img>)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
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
                    backgroundColor: '#f3f3f3' 
                }
            }}>
            {!showCreateAccount ? (
            <div className="modal-content" style={{height: '400px'}}>
                <div className='modal-welcome'>
                    <h2>Welcome to Pokemon Hangman</h2>
                    <div>{pokeballs}</div>
                    <div><strong>Login to Collect a Pokedex or Play as a Guest</strong></div>
                </div>                     
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit"><strong>LOGIN</strong></button>
                </form>
                <div>
                    <button onClick={() => setShowCreateAccount(true)}><strong>CREATE ACCOUNT</strong></button>
                </div>
                <div>
                    <button onClick={onPlayAsGuest}><strong>PLAY AS GUEST</strong></button>
                </div>
            </div>
            ) : (
            <div className="modal-content">
                <h2>Create Account</h2>
                <form onSubmit={handleCreateAccount}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Create Account</button>
                </form>
                <button onClick={() => setShowCreateAccount(false)}>Back</button>
            </div>
            )}
        </Modal>
    );
  }

export default Login
