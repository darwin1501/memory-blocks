import React from "react";

export default function GameOverScreen(props){
    return(
        <>
          <div className='title-container'>
            <h1>Level: {props.level - 1}</h1> 
            <p className='text-md'>Game Over</p>
            <p className='text-sm'><strong>Highest Level Reached:</strong> {localStorage.getItem("highestLevel")}</p>
          </div>
          <div className='btn-play-container'>
            <button className='btn-play' onClick={props.startNewGame}>
              Play Again
            </button>
          </div>
        </>
    )
}