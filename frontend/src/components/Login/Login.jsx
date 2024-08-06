import Modal from 'react-modal';
import pokeball from '../../assets/pokeball.svg';
import { createUser, loginUser } from '../../backendApi'
import { useState, useEffect } from 'react'
import './style.css'


function Login({isOpen, onRequestClose, onLogin, onPlayAsGuest}) {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createUsername, setCreateUserName] = useState('');
    const [createPassowrd, setCreatePassword] = useState('');

    useEffect(() => {
        if (isOpen) {
            resetInputs();
        }
    }, [isOpen]);
  
    //just take care of all xception handling in backendApi file
    async function handleLogin(event) {
        event.preventDefault();
        const {token} = await loginUser(username, password);
        localStorage.setItem("token", token);
        console.log('Logging in with', username, password);
        onLogin(username);
    };
  
    async function handleCreateAccount(event) {
        event.preventDefault();
        const {token} = await createUser(createUsername, createPassowrd);
        localStorage.setItem("token", token);
        console.log('Created account with', createUsername, createPassowrd);
        //creating account auto logs in user
        onLogin(createUsername);
    };

    function resetInputs() {
        setUsername('');
        setPassword('');
        setCreateUserName('');
        setCreatePassword('');
        setShowCreateAccount(false);
    }

    let pokeballs = [];
    for (let i = 0; i < 6; i++) {
        pokeballs.push(<img src={pokeball} style={{width: '20px', height: '20px', margin: '1px'}}></img>)
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
                    backgroundColor: '#f3f3f3',
                    borderRadius: '5%'
                }
            }}>
            {!showCreateAccount ? (
            <div className="modal-content" style={{height: '440px'}}>
                <div className='modal-welcome'>
                    <h1>Welcome to Pokemon Hangman</h1>
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
                <div className='bottom'>
                    <div><strong>Don't have an account?</strong></div>
                    <button onClick={() => setShowCreateAccount(true)}><strong>CREATE ACCOUNT</strong></button>
                    <button onClick={onPlayAsGuest}><strong>PLAY AS GUEST</strong></button>
                </div>
            </div>
            ) : (
            <div className="modal-content" style={{height: '180px'}}>
                <h2><strong>CREATE ACCOUNT</strong></h2>
                <form onSubmit={handleCreateAccount}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={createUsername}
                        onChange={(e) => setCreateUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={createPassowrd}
                        onChange={(e) => setCreatePassword(e.target.value)}
                    />
                    <button type="submit"><strong>CREATE ACCOUNT</strong></button>
                </form>
                <button onClick={() => setShowCreateAccount(false)}><strong>BACK</strong></button>
            </div>
            )}
        </Modal>
    );
  }

export default Login
