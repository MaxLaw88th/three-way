import {createSlice} from "@reduxjs/toolkit";
import {ModifierValuesState} from "../../types";

const initialState: ModifierValuesState = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const modifierValuesSlice = createSlice({
    name: "modifierValues",
    initialState,
    reducers: {
        invertValues: state => [...state].map(val => -val),
    }
});

export const {invertValues} = modifierValuesSlice.actions;

export default modifierValuesSlice.reducer;
