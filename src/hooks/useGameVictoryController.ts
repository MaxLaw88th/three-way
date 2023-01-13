import {useEffect} from "react";
import {setVictory} from "../store/slices/gameState.js";
import {difficultiesLevels} from "../utils";
import {GameCellsState, GameState} from "../types";
import {useAppDispatch, useAppSelector} from "../store";

export const useGameVictoryController = () => {
    const dispatch = useAppDispatch();
    const {started, moves, gameLevel} = useAppSelector<GameState>(state => state.gameState);
    const {fields, modifiers} = useAppSelector<GameCellsState>(state => state.gameCells)

    useEffect(() => {
        if (
            started &&
            fields.every(el => el.value === el.finalValue) &&
            modifiers.every(el => !el.active || ((el.value as number) <= 9 && (el.value as number) >= -9))
        ) {
            dispatch(setVictory(moves <= difficultiesLevels[gameLevel as number].filter(el => el).length))
        }
    }, [fields])
}
