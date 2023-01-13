import {createSlice} from "@reduxjs/toolkit";
import {chooseLevel, resetLevel, setVictory} from "./gameState";
import {TimerState} from "../../types";

const initialState: TimerState = {
    passed: 0,
    running: false
};

export const timerSlice = createSlice({
    initialState,
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
