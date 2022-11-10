import './App.css'
import './UtilStyle.css'
import Block from './components/Block'
import { useState, useEffect } from 'react'

function App () {
  const [pattern, setPattern] = useState([])
  const [level, setLevel] = useState(1)
  const [playerBlockClick, setPlayerBlockClick] = useState()
  // set it to negative one to get the correct value
  const [clickRemaining, setClickRemaining] = useState(-1)

  useEffect(() => {
    generatePatterns()
  }, [])

  function delay (time) {
    return new Promise(res => setTimeout(res, time))
  }

  function getRandomNumber () {
    return Math.floor(Math.random() * 9) + 1
  }

  async function getPatterns () {
    for (let index = 0; index < pattern.length; index++) {
      await delay(1000)
      console.log(pattern[index])
      setClickRemaining(clickRemaining + 1)
    }
  }

  function blockClick (event) {
    // (jsPerf) way to convert string to number
    const value = +event.target.value
    const getNumberInPattern = pattern[playerBlockClick]

    if (playerBlockClick <= clickRemaining) {
      if (value === getNumberInPattern) {
        console.log('correct')
      } else {
        console.log('incorrect')
      }
      setPlayerBlockClick(playerBlockClick + 1)
    }

    if (playerBlockClick === clickRemaining) {
      // get new level
      play()
    }
  }

  async function generatePatterns () {
    let randomNumber = getRandomNumber()
    // generate new number while the number is equal to the previous number
    const lastNumberInPattern = pattern[pattern.length - 1]

    if (lastNumberInPattern === randomNumber) {
      if ((randomNumber += 1) === 9) {
        randomNumber -= 1
      } else {
        randomNumber += 1
      }
    }
    setPattern([...pattern, randomNumber])
    getPatterns()
  }

  function play () {
    generatePatterns()
    setLevel(level + 1)
    // reset number of clicks available
    setPlayerBlockClick(0)
    setClickRemaining(-1)
  }

  return (
    <div className='App'>
      <main>
        <div className='title-container'>
          <h1 className='m-0'>Memory Blocks</h1>
          <p className='m-0'>How much pattern you can memorize?</p>
        </div>
        <div className='flex flex-center'>
          <div className='blocks-container'>
            <Block value={1} blockClick={blockClick} />
            <Block value={2} blockClick={blockClick} />
            <Block value={3} blockClick={blockClick} />
            <Block value={4} blockClick={blockClick} />
            <Block value={5} blockClick={blockClick} />
            <Block value={6} blockClick={blockClick} />
            <Block value={7} blockClick={blockClick} />
            <Block value={8} blockClick={blockClick} />
            <Block value={9} blockClick={blockClick} />
          </div>
        </div>
        <div className='flex flex-center'>
          <div className='btn-play-container'>
            <button className='btn-play' onClick={play}>
              Play
            </button>
          </div>
        </div>
        <footer>
          <p>Created by: Darwin</p>
        </footer>
      </main>
    </div>
  )
}

export default App
