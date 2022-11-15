import React from "react";
import { Link } from "react-router-dom";
import LineChart from "./LineChart";

export default function PlayerStats(props) {
  const [labels, data] = props.getPlayerStats();

  return (
    <div>
      <div className="title-container">
        <p className="text-sm">
          <strong>Highest Level Reached:</strong>{" "}
          {localStorage.getItem("highestLevel")}
        </p>
      </div>
      <div className="flex flex-center">
        <div className="chart-container">
          <LineChart labels={labels} data={data} />
        </div>
      </div>
    </div>
  );
}
