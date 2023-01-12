import {ThemedElement} from "./ThemedElement.jsx";
import {connect} from "react-redux";

export const VictoryLineBoxStateless = ({victory, flawlessVictory, started = false}) => <ThemedElement Component="div" lineBox idle>{started ? victory ? flawlessVictory ? "Flawless Victory!" : "Victory!" : "Playing..." : "Choose level"}</ThemedElement>


export const VictoryLineBox = connect(state => ({
    victory: state.gameState.victory,
    flawlessVictory: state.gameState.flawlessVictory,
    started: state.gameState.started,
}))(VictoryLineBoxStateless);

