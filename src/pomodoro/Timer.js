import React from "react";
import classNames from "../utils/class-names";

function Timer({isTimerRunning, setIsTimerRunning, mode, setMode, setBreakRemaining, setFocusRemaining}) {
    function playPause() {
        // if session is false, reset our timeremaining to default
        setIsTimerRunning((lastState) => !lastState);
        setMode((state) => state === "Stop" ? "Focus" : state);
    }

    function stopTimer() {
        setIsTimerRunning(false);
        setMode("Stop");
        setFocusRemaining(0);
        setBreakRemaining(0);
    }

    function disableStop() {
        return mode === "Stop";
    }

    return (
        <div className="row">
            <div className="col">
                <div
                    className="btn-group btn-group-lg mb-2"
                    role="group"
                    aria-label="Timer controls"
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-testid="play-pause"
                        title="Start or pause timer"
                        onClick={playPause}
                    >
                        <span
                            className={classNames({
                                oi: true,
                                "oi-media-play": !isTimerRunning,
                                "oi-media-pause": isTimerRunning,
                            })}
                        />
                    </button>
                    {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        title="Stop the session"
                        onClick={stopTimer}
                        disabled={disableStop()}
                    >
                        <span className="oi oi-media-stop" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timer;