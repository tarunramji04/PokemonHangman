import Modal from 'react-modal';

function Hint({isOpen, onRequestClose, image}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
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
                src={image}>
            </img>
        </Modal>
    )
}

export default Hint
