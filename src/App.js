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
  const [activePattern, setActivePattern] = useState(0)
  const blockValue = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [currentPatternCount, setCurrentPatternCount] = useState(0);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const blocks = blockValue.map(value=>{
    return (
      <Block 
              value={value} 
              blockClick={blockClick} 
              isShowingPattern={isShowingPattern}
              backgroundColor={backgroundColorSetter(value)}
            />
    )
  })
  

  useEffect(() => {
    async function start(){
      generatePatterns()
    // erase the old level data
    // so prepare for the new
    // level data
    resetLevelData()
    }
    start()
  }, [level])

  function resetLevelData(){
    setActivePattern(0)
    setPlayerBlockClick(0)
    setClickRemaining(-1)
    setCurrentPatternCount(0)
  }

  function delay (time) {
    return new Promise(res => setTimeout(res, time))
  }

  function getRandomNumber () {
    return Math.floor(Math.random() * 9) + 1
  }

  async function getPatterns () {
    setIsShowingPattern(true)
    for (let index = 0; index < pattern.length; index++) {
      await delay(1000)
      // set block effects
      setActivePattern(pattern[index])
      setClickRemaining(clickRemaining + 1)
      setCurrentPatternCount(currentPatternCount + 1)
    }
    await(delay(1000))
    setIsShowingPattern(false)
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
      setLevel(level + 1)
    }
  }

  async function generatePatterns () {
    let randomNumber = getRandomNumber()
    // generate new number while the number is equal to the previous number
    const lastNumberInPattern = pattern[pattern.length - 1]

    // prevent numbers showing 2 times in a row
    if (lastNumberInPattern === randomNumber) {
      if ((randomNumber += 1) === 9) {
        randomNumber -= 1
      } else {
        randomNumber += 1
      }
    }
    
    setPattern([...pattern, randomNumber])
    await getPatterns()
  }

  function backgroundColorSetter(value){

     let backgroundColor = "#24AE9F"
 
     if(value === activePattern){
         backgroundColor = "white"
     }

     return backgroundColor
  }

  function play () {
    setLevel(level + 1)
  }

  return (
    <div className='App'>
      <main>
        <div className='title-container'>
          <p>{}</p>
          <h1 className='m-0'>Memory Blocks</h1>
          <p className='m-0'>How much pattern you can memorize?</p>
        </div>
        <div className='flex flex-center'>
          <div className='blocks-container'>
            {blocks}
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
