import './App.css'
import './UtilStyle.css'
import Block from './components/Block'
import { useState, useEffect, useRef } from 'react'
import GameOverScreen from './components/GameOverScreen'
import PlayGroundScreen from './components/PlayGroundScreen'

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
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const blocks = blockValue.map(value=>{
    return (
      <Block 
              key={value}
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

  function startNewGame(){
    resetLevelData()
    setPattern([])
    setLevel(1)
    setIsGameStarted(false)
    setIsGameOver(false)
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
      await delay(500)
      // set block effects
      setActivePattern(pattern[index])
      setClickRemaining(clickRemaining + 1)
      setCurrentPatternCount(currentPatternCount + 1)
    }
    await(delay(500))
    setIsShowingPattern(false)
  }

  function blockClick (event) {
    // (jsPerf) way to convert string to number
    const value = +event.target.value
    const getNumberInPattern = pattern[playerBlockClick]

    if (playerBlockClick <= clickRemaining) {
      if (value === getNumberInPattern) {
        console.log('correct')
        if (playerBlockClick === clickRemaining) {
          // get new level
              play()
        }
      } else {
        console.log('incorrect')
        // save the level in
        // localstorage if
        // the current level is
        // higher than the
        const oldLevel = localStorage.getItem("highestLevel"); 
        if((level -1) > oldLevel){
          localStorage.setItem("highestLevel", `${(level -1)}`)
        }
        setIsGameOver(true);
      }
      setPlayerBlockClick(playerBlockClick + 1)
    }    
  }

  async function generatePatterns () {
    let randomNumber = getRandomNumber()
    // generate new number while the number is equal to the previous number
    const lastNumberInPattern = pattern[pattern.length - 1]

    // prevent numbers showing 2 times in a row
    // if (lastNumberInPattern === randomNumber) {
    //   if ((randomNumber += 1) === 9) {
    //     randomNumber -= 1
    //   } else {
    //     randomNumber += 1
    //   }
    // }
    while(lastNumberInPattern === randomNumber){
      randomNumber = getRandomNumber()
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
    setIsGameStarted(true)
    setLevel(level + 1)
  }

  return (
    <div className='App'>
      <main>
       {
        isGameOver ?
          <GameOverScreen level={level} startNewGame={startNewGame}/>
        :
          <PlayGroundScreen 
            level={level}
            play={play}
            blocks={blocks}
            isGameStarted={isGameStarted}
          />
       }
        <footer>
          <p>Created by: Darwin</p>
        </footer>
      </main>
    </div>
  )
}

export default App
