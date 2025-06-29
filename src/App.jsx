import React, { useState } from 'react'
import './App.css'
import wordListData from './5000-more-common.txt?raw'

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
      console.log('correct answer')
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
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 185.36 260.68">
        <line x1="0" y1="260.18" x2="117.37" y2="260.18" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
        <line x1="58.68" y1="260.18" x2="58.68" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
        <line x1="149.65" y1=".5" x2="58.68" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
        <line x1="149.65" y1="39.57" x2="149.65" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
        {mistakesNumber > 0 && <ellipse className='path' cx="149.65" cy="62.93" rx="19" ry="23" fill="none" stroke="#000" strokeMiterlimit="10"/>}
        {mistakesNumber > 1 && <line className='path' x1="149.65" y1="85.68" x2="149.65" y2="156.94" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
        {mistakesNumber > 2 && <line className='path' x1="149.65" y1="113.51" x2="184.99" y2="78.17" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
        {mistakesNumber > 3 && <line className='path' x2="116.33" y2="78.17" x1="149.65" y1="113.51" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
        {mistakesNumber > 4 && <line className='path' x1="149.65" y1="156.44" x2="184.99" y2="196.53" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
        {mistakesNumber > 5 && <line className='path' x1="149.65" y1="156.44" x2="116.33" y2="196.53" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
      </svg>

      <div className='placeholder' >{placeholder} </div>
        <input value={userInput} onChange={e => setUserInput(e.target.value)} className={animationActive ? 'text-field animate' : 'text-field'} onAnimationEnd={handleAnimationEnd} onKeyDown={handleKeyDown} />
        <div className='mistake-letters'>{mistakeLetters}</div> 
      </div>

      {isPlaying == false && <div className='overlay'>
        <div className='popup' >
          <div className='feedback'>{userMessage}</div>
          <input className='again-button' type='button' value='Play again' onClick={playAgain}/>
        </div>
      </div>
    }
    
    </>
  )
}

export default App
