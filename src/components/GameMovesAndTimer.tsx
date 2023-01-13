import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {RootState} from "../types";

type GameMovesAndTimerStatelessProps = {
    timePassed: number, moves: number
}

export const GameMovesAndTimerStateless = ({timePassed, moves}: GameMovesAndTimerStatelessProps) => <ThemedElement
    Component="div"
    lineBox
    idle
    values
>Moves: {moves} - Sec. {timePassed}</ThemedElement>

export const GameMovesAndTimer = connect((state: RootState) => ({
    timePassed: state.timer.passed,
    moves: state.gameState.moves,
}))(GameMovesAndTimerStateless)
