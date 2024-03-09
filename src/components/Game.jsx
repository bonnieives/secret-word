import React, { useState, useRef, useEffect } from 'react';
import './Game.css';
import Modal from './Modal';

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
    startGame,
    setScore={setScore}
}) => {
    const [showModal, setShowModal] = useState(false);
    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null);

    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];
        
        if(guessedLetters.length === uniqueLetters.length && guessedLetters.length !== 0) {
            setScore((actualScore) => actualScore + 100);
            setShowModal(true);
        } 
    }, [guessedLetters, letters, startGame]);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter('');
        letterInputRef.current.focus();
    };

    const handleModalClose = () => {
        setShowModal(false);
        startGame();
    };

    return (
        <div className='game'>
            <p className='points'>
                <span>{score} points</span>
            </p>
            <h3 className='tip'>
                Tip: <span>{pickedCategory}</span>
            </h3>
            <p>You still have {guesses} guesses</p>
            <div className='wordContainer'>
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">
                            {letter}
                        </span>
                    ) : (
                        <span key={i} className='blankSquare'></span>
                    )
                ))}
            </div>
            <div className='letterContainer'>
                <p>Try to guess the word:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='letter'
                        maxLength="1"
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>GO!</button>
                </form>
            </div>
            <div className='wrongLettersContainer'>
                <p>Used letters</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
            {showModal && <Modal onClose={handleModalClose} />}
        </div>
    )
}

export default Game;