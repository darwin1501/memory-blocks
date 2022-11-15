import React from "react";
import LineChart from "./LineChart";
import PlayerStats from "./PlayerStats";

export default function GameOverScreen(props) {
  // const [labels, data] = props.getPlayerStats();
  return (
    <div className="main-screen">
      <div className="title-container">
        <h1 className="m-0">Level: {props.level - 1}</h1>
        <p className="text-md m-0">Game Over</p>
      </div>
      <PlayerStats getPlayerStats={props.getPlayerStats} />
      <div className="btn-play-container">
        <button className="btn-play" onClick={props.startNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
}
