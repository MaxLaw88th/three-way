import {configureStore} from "@reduxjs/toolkit";
import gameState from "./slices/gameState";
import gameCells from "./slices/gameCells";
import modifierValues from "./slices/modifierValues";
import timer from "./slices/timer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../types";

export const store = configureStore({
    reducer: {
        gameState,
        gameCells,
        modifierValues,
        timer
    },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector);

setInterval(() => {
    store.dispatch({type: "TIMER_TICK"});
}, 1000);
