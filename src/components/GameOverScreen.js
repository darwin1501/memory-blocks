import React from "react";
import LineChart from "./LineChart";

export default function GameOverScreen(props){
  const playerLevelStats = JSON.parse(localStorage.getItem("playerLevelStats"))
  const playerLevelStatsPropCount = Object.keys(playerLevelStats).length
  const labels = []
  const data = []

  for (let index = 0; index < playerLevelStatsPropCount; index++) {
    const key = Object.keys(playerLevelStats)[index]
    const value = Object.values(playerLevelStats)[index]
    labels.push(key)
    data.push(value)
  }
    return(
        <>
          <div className='title-container'>
            <h1>Level: {props.level - 1}</h1> 
            <p className='text-md'>Game Over</p>
            <p className='text-sm'><strong>Highest Level Reached:</strong> {localStorage.getItem("highestLevel")}</p>
          </div>
          <div className="chart-container">
                <LineChart 
                    labels={labels}
                    data={data}
                />
          </div>
          <div className='btn-play-container'>
            <button className='btn-play' onClick={props.startNewGame}>
              Play Again
            </button>
          </div>
        </>
    )
}