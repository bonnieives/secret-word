import React from 'react'
import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
      <h1>Secret Word</h1>
      <p>Click on the button to start</p>
      <button onClick={startGame}>Start the game</button>
    </div>
  )
}
import "./StartScreen.css"

export default StartScreen
