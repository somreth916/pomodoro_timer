import React from "react";
import { secondsToDuration } from "../utils/duration";

function Session({mode, focusTime, breakTime, focusRemaining, breakRemaining}) {
    if (mode === "Stop") {
      return null;
    }

    function displayFocus() {
      return focusTime === 3600 ? "60:00" : secondsToDuration(focusTime);
    }

    function displayFocusRemain() {
      const time = focusTime - focusRemaining;
      return time === 3600 ? "60:00" : secondsToDuration(time);
    }

    function displayBreakRemain() {
      const time = breakTime - breakRemaining;
      return secondsToDuration(time);
    }

    function breakTimer() {
      return secondsToDuration(breakTime);
    }

    function displayTitle() {
      if (mode === "Focus") {
        return `Focusing for ${displayFocus()} minutes`;
      } else if (mode === "Break") {
        return `On Break for ${breakTimer()} minutes`;
      }
    } 
  
    function displayRemains() {
      if (mode === "Focus") {
        return `${displayFocusRemain()} remaining`;
      } else if (mode === "Break") {
        return `${displayBreakRemain()} remaining`;
      }
    }
  
    function progressBar() {
      let time = 0;
      if (mode === "Focus") {
        time = ((focusRemaining / focusTime) * 100);
      } else if (mode === "Break") {
        time = ((breakRemaining / breakTime) * 100);
      }
      return time;
    }

    return (
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{displayTitle()}</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">{displayRemains()}</p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBar()} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressBar()}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Session;