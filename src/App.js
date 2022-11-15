import "./App.css";
import "./UtilStyle.css";
import Block from "./components/Block";
import { useState, useEffect } from "react";
import GameOverScreen from "./components/GameOverScreen";
import PlayGroundScreen from "./components/PlayGroundScreen";
import { Link, Routes, Route } from "react-router-dom";
import PlayerStats from "./components/PlayerStats";

function App() {
  const [pattern, setPattern] = useState([]);
  const [level, setLevel] = useState(1);
  const [playerBlockClick, setPlayerBlockClick] = useState();
  // set it to negative one to get the correct value
  const [clickRemaining, setClickRemaining] = useState(-1);
  const [activePattern, setActivePattern] = useState(0);
  const blockValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [currentPatternCount, setCurrentPatternCount] = useState(0);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [levelsReached, setLevelReached] = useState([]);
  const [bg, setBg] = useState("#390930");
  const [isCustomGameSpeed, setIsCustomGameSpeed] = useState(false);
  const [customGameSpeed, setCustomGameSpeed] = useState(400);

  const blocks = blockValue.map((value) => {
    return (
      <Block
        key={value}
        value={value}
        blockClick={blockClick}
        isShowingPattern={isShowingPattern}
        backgroundColor={backgroundColorSetter(value)}
      />
    );
  });

  useEffect(() => {
    async function start() {
      generatePatterns();
      // erase the old level data
      // so prepare for the new
      // level data
      resetLevelData();
    }
    start();
  }, [level]);

  function resetLevelData() {
    setActivePattern(0);
    setPlayerBlockClick(0);
    setClickRemaining(-1);
    setCurrentPatternCount(0);
  }

  function startNewGame() {
    resetLevelData();
    setPattern([]);
    setLevel(1);
    setIsGameStarted(false);
    setIsGameOver(false);
    setLevelReached([]);
  }

  function delay(time) {
    return new Promise((res) => setTimeout(res, time));
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  async function showPattern() {
    const time = isCustomGameSpeed ? customGameSpeed : 500;
    setIsShowingPattern(true);
    for (let index = 0; index < pattern.length; index++) {
      await delay(time);
      // set block effects
      setActivePattern(pattern[index]);
      setClickRemaining(clickRemaining + 1);
      setCurrentPatternCount(currentPatternCount + 1);
    }
    await delay(time);
    setIsShowingPattern(false);
  }

  function blockClick(event) {
    // (jsPerf) way to convert string to number
    const value = +event.target.value;
    const getNumberInPattern = pattern[playerBlockClick];

    if (playerBlockClick <= clickRemaining) {
      if (value === getNumberInPattern) {
        // if the player hit the last pattern
        if (playerBlockClick === clickRemaining) {
          //flash background color
          flashBg("#4F0B42");
          setLevelReached([...levelsReached, level - 1]);
          // get new level
          play();
        }
      } else {
        // save the level in
        // localstorage if
        // the current level is
        // higher than the old highest level reached
        const oldLevel = localStorage.getItem("highestLevel");
        if (level - 1 > oldLevel) {
          localStorage.setItem("highestLevel", `${level - 1}`);
        }
        flashBg("#851616");
        // save the player level completed
        saveLevelCompleted(levelsReached);

        setIsGameOver(true);
      }

      // to prepare it for line chart
      setPlayerBlockClick(playerBlockClick + 1);
    }
  }

  async function generatePatterns() {
    let randomNumber = getRandomNumber();
    // generate new number while the number is equal to the previous number
    const lastNumberInPattern = pattern[pattern.length - 1];

    // prevent numbers showing 2 times in a row
    // if (lastNumberInPattern === randomNumber) {
    //   if ((randomNumber += 1) === 9) {
    //     randomNumber -= 1
    //   } else {
    //     randomNumber += 1
    //   }
    // }

    while (lastNumberInPattern === randomNumber) {
      randomNumber = getRandomNumber();
    }

    setPattern([...pattern, randomNumber]);
    await showPattern();
  }

  function backgroundColorSetter(value) {
    let backgroundColor = "#24AE9F";

    if (value === activePattern) {
      backgroundColor = "white";
    }

    return backgroundColor;
  }

  function play() {
    setIsGameStarted(true);
    setLevel(level + 1);
  }

  function saveLevelCompleted(levels) {
    const newPLayerLevelStats = {};
    const getOldPlayerLevelStats = localStorage.getItem("playerLevelStats");

    // assign properties
    for (let index = 0; index < levels.length; index++) {
      newPLayerLevelStats[`level ${levels[index]}`] = 1;
    }

    // if the player played for the first time
    if (getOldPlayerLevelStats === null) {
      // save the new player level played
      localStorage.setItem(
        "playerLevelStats",
        JSON.stringify(newPLayerLevelStats)
      );
    } else {
      const getOldPlayerStats = localStorage.getItem("playerLevelStats");
      const oldPlayerLevelStatsPropCount = Object.keys(
        JSON.parse(getOldPlayerStats)
      ).length;
      const newPlayerLevelStatsPropCount =
        Object.keys(newPLayerLevelStats).length;

      /* if the current level played is
       * greater than the old level played
       * replace old labels in the player level stats by
       * the new labels from the current player level stats
       * */

      const copyOfOldLevelPlayerStats = JSON.parse(getOldPlayerStats);

      if (newPlayerLevelStatsPropCount > oldPlayerLevelStatsPropCount) {
        // run for loop to access each property in object
        for (let index = 0; index < newPlayerLevelStatsPropCount; index++) {
          const key = Object.keys(copyOfOldLevelPlayerStats)[index];
          const value = Object.values(copyOfOldLevelPlayerStats)[index];

          // if the property exist
          if (key !== undefined) {
            // add 1 on each level reached
            copyOfOldLevelPlayerStats[`${key}`] = value + 1;
          } else {
            // add the new property
            copyOfOldLevelPlayerStats[`level ${index + 1}`] = 1;
          }
        }
        // save to local storage
        localStorage.setItem(
          "playerLevelStats",
          JSON.stringify(copyOfOldLevelPlayerStats)
        );
      } else {
        /* else
         *   add 1 on each level reached
         * */
        for (let index = 0; index < newPlayerLevelStatsPropCount; index++) {
          const key = Object.keys(copyOfOldLevelPlayerStats)[index];
          const value = Object.values(copyOfOldLevelPlayerStats)[index];
          // add the new property
          copyOfOldLevelPlayerStats[`${key}`] = value + 1;
        }
        // save to local storage
        localStorage.setItem(
          "playerLevelStats",
          JSON.stringify(copyOfOldLevelPlayerStats)
        );
      }
    }
  }

  function getPlayerStats() {
    const playerLevelStats = JSON.parse(
      localStorage.getItem("playerLevelStats")
    );
    const playerLevelStatsPropCount = Object.keys(playerLevelStats).length;
    const labels = [];
    const data = [];

    for (let index = 0; index < playerLevelStatsPropCount; index++) {
      const key = Object.keys(playerLevelStats)[index];
      const value = Object.values(playerLevelStats)[index];
      labels.push(key);
      data.push(value);
    }

    return [labels, data];
  }

  function handleUseCustomGameSpeed() {
    setIsCustomGameSpeed(!isCustomGameSpeed);
  }

  function increaseGameSpeed() {
    let speed = customGameSpeed - 100;
    if (speed < 100) {
      speed = 100;
    }
    setCustomGameSpeed(speed);
  }

  function decreaseGameSpeed() {
    let speed = customGameSpeed + 100;
    if (speed > 1000) {
      speed = 1000;
    }
    setCustomGameSpeed(speed);
  }

  async function flashBg(color) {
    setBg(color);
    await delay(200);
    setBg("#390930");
  }

  return (
    <div className="App" style={{ background: bg }}>
      <main>
        {isGameOver ? (
          <GameOverScreen
            level={level}
            startNewGame={startNewGame}
            getPlayerStats={getPlayerStats}
          />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {!isGameStarted && (
                    <Link to="/playerstats" style={{ textDecoration: "none" }}>
                      <div className="flex flex-end">
                        <p className="nav-text text-important">Your Stats</p>
                      </div>
                    </Link>
                  )}
                  <PlayGroundScreen
                    level={level}
                    play={play}
                    blocks={blocks}
                    isGameStarted={isGameStarted}
                    isCustomGameSpeed={isCustomGameSpeed}
                    handleUseCustomGameSpeed={handleUseCustomGameSpeed}
                    customGameSpeed={customGameSpeed}
                    increaseGameSpeed={increaseGameSpeed}
                    decreaseGameSpeed={decreaseGameSpeed}
                  />
                </>
              }
            />
            <Route
              path="/playerstats"
              element={
                <>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="flex flex-start">
                      <p className="nav-text text-important">Play the Game</p>
                    </div>
                  </Link>
                  <div className="title-container">
                    <p className="text-md m-0">Your Stats</p>
                  </div>
                  <PlayerStats getPlayerStats={getPlayerStats} />
                </>
              }
            />
          </Routes>
        )}
        <a href="https://darwin1501.github.io" target="_blank">
          <footer>
            <p
              className="text-important footer-text"
              style={{ width: "150px", margin: "auto" }}
            >
              Created by: Darwin
            </p>
          </footer>
        </a>
      </main>
    </div>
  );
}

export default App;
