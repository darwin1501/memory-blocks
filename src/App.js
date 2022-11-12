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
  const [levelsReached, setLevelReached] = useState([])

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
    setLevelReached([])
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
        if (playerBlockClick === clickRemaining) {
          // record player level reached
          // console.log(level -1)
          setLevelReached([...levelsReached, level-1])
          // get new level
              play()
          
        }
      } else {
        // save the level in
        // localstorage if
        // the current level is
        // higher than the old highest level reached
        const oldLevel = localStorage.getItem("highestLevel"); 
        if((level -1) > oldLevel){
          localStorage.setItem("highestLevel", `${(level -1)}`)
        }
        // save the player level completed
        saveLevelCompleted(levelsReached)

        setIsGameOver(true);
      }
      
      // to prepare it for line chart
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

  function saveLevelCompleted(levels){
    const newPLayerLevelStats = {}
    const getOldPlayerLevelStats = localStorage.getItem("playerLevelStats")

    // assign properties
    for (let index = 0; index < levels.length; index++) {
      newPLayerLevelStats[`level ${levels[index]}`] = 1
    }

    // if the player played for the first time
    if(getOldPlayerLevelStats === null){
      // save the new player level played
      localStorage.setItem("playerLevelStats", JSON.stringify(newPLayerLevelStats))
    }else{
      const getOldPlayerStats = localStorage.getItem("playerLevelStats")
      const oldPlayerLevelStatsPropCount = Object.keys(JSON.parse(getOldPlayerStats)).length
      const newPlayerLevelStatsPropCount = Object.keys(newPLayerLevelStats).length

      /* if the current level played is
      * greater than the old level played
      * replace old labels in the player level stats by
      * the new labels from the current player level stats
      * */

      const copyOfOldLevelPlayerStats = JSON.parse(getOldPlayerStats)

      if(newPlayerLevelStatsPropCount > oldPlayerLevelStatsPropCount){
          
          // run for loop to access each property in object
          for (let index = 0; index < newPlayerLevelStatsPropCount; index++) {

            const key = Object.keys(copyOfOldLevelPlayerStats)[index]
            const value = Object.values(copyOfOldLevelPlayerStats)[index]
            
            // if the property exist
            if(key !== undefined){
              // add 1 on each level reached 
              copyOfOldLevelPlayerStats[`${key}`] = value + 1
            }else{
              // add the new property
              copyOfOldLevelPlayerStats[`level ${index+1}`] = 1
            }
          }
          // save to local storage
          localStorage.setItem("playerLevelStats", JSON.stringify(copyOfOldLevelPlayerStats))
      }else{
        console.log("old")
        console.log(newPlayerLevelStatsPropCount)
        console.log(newPLayerLevelStats)
        /* else
        *   add 1 on each level reached 
        * */
          for (let index = 0; index < newPlayerLevelStatsPropCount; index++) {

            const key = Object.keys(copyOfOldLevelPlayerStats)[index]
            const value = Object.values(copyOfOldLevelPlayerStats)[index]
            // add the new property
            copyOfOldLevelPlayerStats[`${key}`] = value + 1
          }
        // save to local storage
        localStorage.setItem("playerLevelStats", JSON.stringify(copyOfOldLevelPlayerStats))
      }      
    }
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
