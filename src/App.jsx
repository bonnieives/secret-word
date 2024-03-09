import { useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import { useCallback, useEffect } from 'react'
import { wordList } from './data/word'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, stageName : "start"},
  {id: 2, stageName: "game"},
  {id: 3, stageName: "end"},
];

function App() {
  const [gameStage, setGameState] = useState(stages[0].stageName);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const[pickedCategory,setPickedCategory] = useState("");
  const[letters, setLetters] = useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const[wrongLetters, setWrongLetters] = useState([]);
  const[guesses,setGuesses] = useState(3);
  const[score,setScore] = useState(0);
  const[showModal, setShowModal] = useState(false);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category};
  },[words])

  const startGame = useCallback(() => {
    clearLetterStates();

    const {word,category} = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    
    setGameState(stages[1].stageName);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
      if(guesses <= 0) {
        clearLetterStates();
        setGameState(stages[2].stageName)
      } 
  }, [guesses])

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameState(stages[0].stageName);
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    startGame();
  };

  return (
    
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        startGame={startGame}
        setScore={setScore}
        />)}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App
