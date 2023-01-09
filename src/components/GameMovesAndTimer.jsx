import {ThemedElement} from "./ThemedElement.jsx";

export const GameMovesAndTimer = ({timePassed, moves}) => <ThemedElement Component="div" lineBox idle values>Moves: {moves} - Sec. {timePassed}</ThemedElement>
