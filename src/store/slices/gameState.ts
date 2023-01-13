import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameState, MoveDone} from "../../types";

const initialState: GameState = {
    started: false,
    moves: 0,
    victory: false,
    flawlessVictory: false,
    timePassed: 0,
    gameLevel: null,
    movesDone: []
}

export const gameStateSlice = createSlice({
    name: "gameState",
    initialState,
    reducers: {
        startGame: state => {
            state.started = true;
        },
        stopGame: state => {
            state.started = false;
        },
        doMove: state => {
            state.moves++;
        },
        resetMoves: state => {
            state.moves = 0;
        },
        setVictory: (state, action: PayloadAction<boolean>) => {
            state.victory = true;
            state.flawlessVictory = action.payload;
        },
        resetVictory: state => {
            state.victory = false;
            state.flawlessVictory = false;
        },
        timerTick: state => {
            state.timePassed++;
        },
        resetTimer: state => {
            state.timePassed = 0;
        },
        chooseLevel: (state, action: PayloadAction<number>) => ({
            ...initialState,
            gameLevel: action.payload,
            started: true
        }),
        resetLevel: (state, action: PayloadAction<number>) => ({
            ...initialState,
            started: true,
            gameLevel: action.payload
        }),
        addMovesDone: (state, action: PayloadAction<MoveDone>) => {
            state.movesDone.push(action.payload);
        },
        setMoveUndone: (state, action: PayloadAction<number>) => {
            state.movesDone[action.payload].undone = true;
        }
    }
});

export const {
    resetVictory,
    setMoveUndone,
    resetLevel,
    doMove,
    resetMoves,
    setVictory,
    startGame,
    stopGame,
    resetTimer,
    timerTick,
    chooseLevel,
    addMovesDone
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
