import {useState} from "react";
import {useInterval} from "./useInterval.jsx";
import {useDispatch, useSelector} from "react-redux";
import {resetTimer, timerTick} from "../store/slices/gameState.js";

export const useTimer = () => {
    const dispatch = useDispatch();
    const {timePassed} = useSelector(state => state.gameState);

    const [delay, setDelay] = useState(null);

    useInterval(() => {
        dispatch(timerTick());
    }, delay);

    const startTimer = () => {
        setDelay(1000);
    }

    const stopTimer = () => {
        setDelay(null);
    }

    const onResetTimer = () => {
        dispatch(resetTimer());
        startTimer();
    }

    return [timePassed, startTimer, stopTimer, onResetTimer];
}
