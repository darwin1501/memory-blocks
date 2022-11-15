import React from "react";
import arrowLeft from "../icons/arrow_left.svg";
import arrowRight from "../icons/arrow_right.svg";

export default function PlayGroundScreen(props) {
  const {
    isGameStarted,
    level,
    blocks,
    isCustomGameSpeed,
    handleUseCustomGameSpeed,
    play,
    customGameSpeed,
    increaseGameSpeed,
    decreaseGameSpeed,
  } = props;

  function setCustomGameSpeedLabel(customGameSpeed) {
    switch (customGameSpeed) {
      case 100:
        return "4x Faster";
      case 200:
        return "3x Faster";
      case 300:
        return "2x Faster";
      case 400:
        return "1x Faster";
      case 500:
        return "Normal";
      case 600:
        return "1x Slower";
      case 700:
        return "2x Slower";
      case 800:
        return "3x Slower";
      case 900:
        return "4x Slower";
      case 1000:
        return "5x Slower";
    }
  }

  return (
    <div className="main-screen">
      <div className="title-container">
        {isGameStarted ? (
          <h1>Level: {level - 1}</h1>
        ) : (
          <>
            <h1 className="m-0 title">Memory Blocks</h1>
            <p className="m-0 sub-title">How much pattern you can memorize?</p>
          </>
        )}
      </div>
      <div className="flex flex-center">
        <div className="blocks-container">{blocks}</div>
      </div>
      <div className="flex flex-center">
        <div className="btn-play-container">
          {!isGameStarted && (
            <button className="btn-play" onClick={play}>
              Play
            </button>
          )}
        </div>
      </div>
      {!isGameStarted && (
        <div className="flex flex-center">
          <div className="flex flex-center gap-sm">
            <input
              type="checkbox"
              checked={isCustomGameSpeed}
              onChange={handleUseCustomGameSpeed}
              style={{ height: "25px", width: "25px" }}
            />
            <p style={{ color: "white" }}>Change Speed?</p>
          </div>
        </div>
      )}
      {isCustomGameSpeed && !isGameStarted && (
        <div className="flex flex-center">
          <div className="flex">
            <button className="w-md btn-arrow" onClick={decreaseGameSpeed}>
              <img src={arrowLeft} alt="arrow left" />
            </button>
            <div
              className="pad-sm"
              style={{ textAlign: "center", width: "80px" }}
            >
              <p style={{ color: "white" }}>
                {setCustomGameSpeedLabel(customGameSpeed)}
              </p>
            </div>
            <button className="w-md btn-arrow" onClick={increaseGameSpeed}>
              <img src={arrowRight} alt="arrow right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
