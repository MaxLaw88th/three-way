import {useState} from "react";
import {useInterval} from "./useInterval.jsx";

export const useTimer = () => {
    const [timePassed, setTimePassed] = useState(0);

    const [delay, setDelay] = useState(null);

    useInterval(() => {
        setTimePassed(actTime => ++actTime)
    }, delay);

    const startTimer = () => {
        setDelay(1000);
    }

    const stopTimer = () => {
        setDelay(null);
    }

    const resetTimer = () => {
        setTimePassed(0);
        startTimer();
    }

    return [timePassed, startTimer, stopTimer, resetTimer];
}
