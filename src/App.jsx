import React, { useState } from 'react'
import './App.css'
import wordListData from './5000-more-common.txt?raw'
import HangmanDrawing from './components/HangmanDrawing.jsx'
import Placeholder from './components/Placeholder.jsx'
import UserInput from './components/UserInput.jsx'
import MistakeLetters from './components/MistakeLetters.jsx'
import Popup from './components/Popup.jsx'

function App() {
  const wordList = wordListData.split('\n')
  
  const [currentWord, setCurrentWord] = React.useState(wordList[Math.floor(Math.random() * 499)])
  const [placeholder, setPlaceholder] = React.useState([])
  const [userInput, setUserInput] = React.useState('')
  const [userLetter, setUserLetter] = React.useState('')
  const [animationActive, setAnimationActive] = React.useState(false)
  const [mistakesNumber, setMistakesNumber] = React.useState(0)
  const [mistakeLetters, setMistakeLetters] = React.useState([])
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [userMessage, setUserMessage] = React.useState('')

  React.useEffect(() => {
    setPlaceholder(currentWord.split('').map(() => '_'))
  }, [currentWord])

  React.useEffect(() => {
    if (placeholder != '' && placeholder.findIndex((element) => element == '_') == -1) {
        setTimeout(() => {
          setUserMessage('Well done!')
          setIsPlaying(false)
        }, 250);
      }
  }, [placeholder])

  React.useEffect(() => {
    if (mistakesNumber == 6) {
      setTimeout(() => {
        setUserMessage('You were killed! The correct answer was ' + currentWord)
        setIsPlaying(false)
        }, 500);
    }
  }, [mistakesNumber])
  
  function checkWord(input) {
    setUserLetter(userInput)
    setUserInput('')
    if (input.length == 1 && input != '' && placeholder.findIndex((element) => element == input.toLowerCase()) == -1 && mistakeLetters.findIndex((element) => element == input.toLowerCase()) == -1 && currentWord.includes(input.toLowerCase())) {
      setPlaceholder((prevPlaceholder) => (
        prevPlaceholder.map((value, index) => (
          (value == '_' && input.toLowerCase() == currentWord[index]) ? input.toLowerCase() : value
        ))
      ))
    } else if (input.length > 1 || input == '' || mistakeLetters.findIndex((element) => element == input.toLowerCase()) != -1 || placeholder.findIndex((element) => element == input.toLowerCase()) != -1) {
      setAnimationActive(true)
    } else {
      setAnimationActive(true)
      setMistakesNumber((prevMistakesNumber) => prevMistakesNumber + 1)
      setMistakeLetters((prevMistakeLetters) => ([
        ...prevMistakeLetters,
        input.toLowerCase()
      ]))
    }
  }

  function playAgain() {
    setCurrentWord(wordList[Math.floor(Math.random() * 499)])
    setMistakesNumber(0)
    setMistakeLetters([])
    setIsPlaying(true)
  }

  function handleAnimationEnd() {
    setAnimationActive(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      checkWord(userInput)
    }
  }

  return (
    <>
      <div className='game-items'>
        <HangmanDrawing mistakesNumber={mistakesNumber}/>
        <Placeholder placeholder={placeholder} />
        <UserInput userInput={userInput} onChange={e => setUserInput(e.target.value)} animationActive={animationActive} handleAnimationEnd={handleAnimationEnd} handleKeyDown={handleKeyDown}/>
        <MistakeLetters mistakeLetters={mistakeLetters} /> 
      </div>

      {isPlaying == false && <Popup onClick={playAgain} userMessage={userMessage}/> }
    
    </>
  )
}

export default App
