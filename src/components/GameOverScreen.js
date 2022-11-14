import React from "react";
import LineChart from "./LineChart";

export default function GameOverScreen(props) {
  const [labels, data] = props.getPlayerStats();
  return (
    <>
      <div className="title-container">
        <h1>Level: {props.level - 1}</h1>
        <p className="text-md">Game Over</p>
        <p className="text-sm">
          <strong>Highest Level Reached:</strong>{" "}
          {localStorage.getItem("highestLevel")}
        </p>
      </div>
      <div className="chart-container">
        <LineChart labels={labels} data={data} />
      </div>
      <div className="btn-play-container">
        <button className="btn-play" onClick={props.startNewGame}>
          Play Again
        </button>
      </div>
    </>
  );
}
