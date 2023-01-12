import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        setVictory: (state, action) => {
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
        chooseLevel: (state, action) => ({
            ...initialState,
            gameLevel: action.payload,
            started: true
        }),
        resetLevel: (state, action) => ({
            ...initialState,
            started: true,
            gameLevel: action.payload
        }),
        addMovesDone: (state, action) => {
            state.movesDone.push(action.payload);
        },
        setMoveUndone: (state, action) => {
            state.movesDone[action.payload].undone = true;
        }
    }
});

export const {resetVictory, setMoveUndone, resetLevel, doMove, resetMoves, setVictory, startGame, stopGame, resetTimer, timerTick, chooseLevel, addMovesDone} = gameStateSlice.actions;

export default gameStateSlice.reducer;
