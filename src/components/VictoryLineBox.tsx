import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {RootState} from "../types";

type VictoryLineBoxStatelessProps = {
    victory: boolean,
    flawlessVictory: boolean,
    started?: boolean,
}

export const VictoryLineBoxStateless = ({victory, flawlessVictory, started = false}: VictoryLineBoxStatelessProps) =>
    <ThemedElement Component="div"
                   lineBox
                   idle>{started ? victory ? flawlessVictory ? "Flawless Victory!" : "Victory!" : "Playing..." : "Choose level"}</ThemedElement>


export const VictoryLineBox = connect((state: RootState) => ({
    victory: state.gameState.victory,
    flawlessVictory: state.gameState.flawlessVictory,
    started: state.gameState.started,
}))(VictoryLineBoxStateless);

