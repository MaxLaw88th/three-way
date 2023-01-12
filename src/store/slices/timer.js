import {createSlice} from "@reduxjs/toolkit";
import {chooseLevel, resetLevel, setVictory} from "./gameState.js";

export const timerSlice = createSlice({
    initialState: {
        passed: 0,
        running: false
    },
    name: "timer",
    reducers: {
        start: state => {
            state.running = true;
        },
        stop: state => {
            state.running = false;
        },
        reset: state => {
            state.passed = 0;
        }
    },
    extraReducers: builder => {
        builder.addCase("TIMER_TICK", state => {
            if (state.running) state.passed++;
        });
        builder.addCase(setVictory, (state) => {
            state.running = false;
        });

        builder.addCase(chooseLevel, state => {
            state.running = true;
            state.passed = 0;
        });
        builder.addCase(resetLevel, state => {
            state.running = true;
            state.passed = 0;
        });
    }
});

export const {reset, start, stop} = timerSlice.actions;


export default timerSlice.reducer;
