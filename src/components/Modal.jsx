import React, { useState, useEffect} from 'react';
import './Modal.css';

function Modal({onClose}) {
    return(
        <div className='modal-overlay'>
            <div className="modal">
                <div className="modal-content">
                    <p>Congratulations! You guessed all letters correctly.</p>
                    <button onClick={onClose}>YAY!</button>
                </div>
            </div>
        </div>
    )
}

export default Modal