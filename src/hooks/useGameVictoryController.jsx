import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setVictory} from "../store/slices/gameState.js";
import {difficultiesLevels} from "../utils/index.jsx";

export const useGameVictoryController = () => {
    const dispatch = useDispatch();
    const {
        started,
        moves,
        gameLevel,
    } = useSelector(state => state.gameState);

    const {fields, modifiers,} = useSelector(state => state.gameCells)

    // al cambio di una casella
    useEffect(() => {
        // controlla lo stato della partita per assegnare la vittoria
        if (
            // la partita è cominciata
            started &&
            // ogni casella ha assunto il suo valore finale
            fields.every(el => el.value === el.finalValue) &&
            // ogni modificatore attivo ha un valore compreso tra -9 e 9
            modifiers.every(el => !el.active || (el.value <= 9 && el.value >= -9))
        ) {
            // imposta la partita come vinta
            dispatch(setVictory(moves <= difficultiesLevels[gameLevel].filter(el => el).length))
            //interrompe il timer
        }
    }, [fields])
}
