import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import Session from "./Session";
import Timer from "./Timer";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [focusRemaining, setFocusRemaining] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(0);
  const [mode, setMode] = useState("Stop");

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (mode === "Focus") {
        setFocusRemaining((duration) => duration + 1);
        const time = focusTime - focusRemaining;
        if (time === 0) {
          // play the alarm
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setMode("Break");
          setFocusRemaining(0);
        }
      } else if (mode === "Break") {
        setBreakRemaining((duration) => duration + 1);
        const time = breakTime - breakRemaining;
        if (time === 0) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setMode("Focus");
          setBreakRemaining(0);
        }
      }
    },
    isTimerRunning ? 1000 : null
  );

  const decreaseFocus = () => {
    setFocusTime((lastFocus) => lastFocus - (5 * 60)); 
  };

  const increaseFocus = () => {
    setFocusTime((lastFocus) => lastFocus + (5 * 60)); 
  };

  const decreaseBreak = () => {
    setBreakTime((lastBreak) => lastBreak - 60);
  };

  const increaseBreak = () => {
    setBreakTime((lastBreak) => lastBreak + 60);
  };

  function displayFocus() {
    return focusTime === 3600 ? "60:00" : secondsToDuration(focusTime);
  }

  function disableButtons() {
    return mode !== "Stop";
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {displayFocus()}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocus}
                disabled={disableButtons() || focusTime <= (5 * 60)}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocus}
                disabled={disableButtons() || focusTime >= (60 * 60)}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreak}
                  disabled={disableButtons() || breakTime <= 60}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreak}
                  disabled={disableButtons() || breakTime >= (15 * 60)}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Timer 
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        mode={mode}
        setMode={setMode}
        setBreakRemaining={setBreakRemaining}
        setFocusRemaining={setFocusRemaining}
      />
      <Session
        mode={mode}
        focusTime={focusTime}
        breakTime={breakTime}
        focusRemaining={focusRemaining}
        breakRemaining={breakRemaining} 
      />
    </div>
  );
}

export default Pomodoro;
