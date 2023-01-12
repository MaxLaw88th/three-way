import {configureStore} from "@reduxjs/toolkit";
import gameState from "./slices/gameState.js";
import gameCells from "./slices/gameCells.js";
import modifierValues from "./slices/modifierValues.js";
import timer from "./slices/timer.js";

export const store = configureStore({
    reducer: {
        gameState,
        gameCells,
        modifierValues,
        timer
    }
});

setInterval(() => {
    store.dispatch({type: "TIMER_TICK"});
}, 1000);
