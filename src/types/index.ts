import {store} from "../store";
import React, {PropsWithChildren, ReactNode} from "react";

export type FieldCell = {
    value: number,
    finalValue: number,
    highlighted: boolean,
    chosen: boolean,
};
export type ModifierCell = {
    active: boolean,
    modify: number[],
    value: number | null,
    highlighted: boolean
};
export type ModifierValuesState = number[];
export type TimerState = {
    passed: number,
    running: boolean
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type MoveDone = {
    modifier: number,
    value: number,
    time: string,
    undone: boolean
};
export type GameState = {
    started: boolean,
    moves: number,
    victory: boolean,
    flawlessVictory: boolean,
    timePassed: number,
    gameLevel: number | null,
    movesDone: MoveDone[],
}
export type GameCellsState = {
    fields: FieldCell[],
    modifiers: ModifierCell[],
    activeModifier: number | null,
    highlightedFields: number[],
    highlightedModifiers: number[],
}
export type ThemedElementProps = {
    fog?: boolean,
    flex?: boolean,
    column?: boolean,
    table?: boolean,
    box?: boolean,
    idle?: boolean,
    values?: boolean,
    active?: boolean,
    highlighted?: boolean,
    chosen?: boolean,
    modifier?: boolean,
    gameCell?: boolean,
    lineBox?: boolean,
    resolved?: boolean,
    restart?: boolean,
    dispatch?: any,
    Component: React.ComponentType<PropsWithChildren<{ className: string }>> | string,
    children?: ReactNode,

    [x: string]: any
}
