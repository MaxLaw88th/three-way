import {getInitialGameFiledCells, getInitialsModifiers, initialGameFieldCells, initialModifiers} from "../../utils/index.jsx";
import {createSlice} from "@reduxjs/toolkit";
import {chooseLevel, resetLevel} from "./gameState.js";

const initialState = {
    fields: [...initialGameFieldCells],
    modifiers: [...initialModifiers],
    activeModifier: null,
    highlightedFields: [],
    highlightedModifiers: [],
}

const resetState = gameLevel => {
    const newGameFieldCells = [...getInitialGameFiledCells()];
    const newGameModifiers = [...getInitialsModifiers(gameLevel)].map(mod => ({
        ...mod, value: mod.active ? Math.ceil(Math.random() * 9999) % 18 - 9 : null
    }));

    newGameModifiers.forEach(mod => {
        //assegna i valori dei modificatori alle caselle
        mod.modify.forEach(cellPos => {
            newGameFieldCells[cellPos].value += mod.value;
        })
        // riporta allo stato iniziale i modificatori
        mod.value = mod.active ? 0 : null;
    });

    return {
        fields: newGameFieldCells,
        modifiers: newGameModifiers,
        activeModifier: null,
        highlightedFields: [],
        highlightedModifiers: [],
    }
}

export const gameCellsSlice = createSlice({
    name: "gameCells",
    initialState,
    reducers: {
        resetCells: (state, action) => resetState(action.payload),
        highlightFields: (state, action) => {
            state.highlightedFields = action.payload;
        },
        removeHighlightFields: state => {
            state.highlightedFields = [];
        },
        highlightModifiers: (state, action) => {
            state.modifiers.forEach((mod, pos) => {
                if (mod.modify.includes(action.payload) && mod.active) state.highlightedModifiers.push(pos);
            })
        },
        removeHighlightModifiers: state => {
            state.highlightedModifiers = [];
        },
        chooseModifier: (state, action) => {
            if (state.modifiers[action.payload].active) {
                state.activeModifier = action.payload;
            }
        },
        addModifierValue: (state, action) => {
            const valueToAdd = action.payload.value;
            const modifier = action.payload.modifier;

            if (modifier === null) return;
            state.modifiers[modifier].value += valueToAdd;

            state.modifiers[modifier].modify.forEach(fieldCellPos => {
                state.fields[fieldCellPos].value += valueToAdd;
            });

            state.activeModifier = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(chooseLevel, (state, action) => resetState(action.payload));
        builder.addCase(resetLevel, (state, action) => resetState(action.payload));
    }
});

export const {addModifierValue, chooseModifier, highlightFields, removeHighlightFields, highlightModifiers, removeHighlightModifiers, resetCells} = gameCellsSlice.actions;

export default gameCellsSlice.reducer;
