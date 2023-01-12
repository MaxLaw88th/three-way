import {ThemedElement} from "./ThemedElement.jsx";
import {connect} from "react-redux";

export const GameMovesAndTimerStateless = ({timePassed, moves}) => <ThemedElement Component="div" lineBox idle values>Moves: {moves} - Sec. {timePassed}</ThemedElement>

export const GameMovesAndTimer = connect(state => ({
    timePassed: state.timer.passed,
    moves: state.gameState.moves,
}))(GameMovesAndTimerStateless)
