import {ThemedElement} from "./ThemedElement.jsx";
import {connect} from "react-redux";
import {chooseLevel, resetLevel} from "../store/slices/gameState.js";

export const LevelChangeBoxStateless = ({onChangeLevel, gameLevel, restart}) => <>
    <ThemedElement restart={gameLevel === 0} Component="div" box onClick={() => gameLevel === 0 ? restart() : onChangeLevel(0)}>{gameLevel === 0 ? <span style={{color: "red"}}>R</span> : "1"}</ThemedElement>
    <ThemedElement restart={gameLevel === 1} Component="div" box onClick={() => gameLevel === 1 ? restart() : onChangeLevel(1)}>{gameLevel === 1 ? <span style={{color: "red"}}>R</span> : "2"}</ThemedElement>
    <ThemedElement restart={gameLevel === 2} Component="div" box onClick={() => gameLevel === 2 ? restart() : onChangeLevel(2)}>{gameLevel === 2 ? <span style={{color: "red"}}>R</span> : "3"}</ThemedElement>
</>

export const LevelChangeBox = connect(state => ({
    gameLevel: state.gameState.gameLevel
}))(connect(
    (state, props) => ({...props}),
    (dispatch, {gameLevel}) => ({
        onChangeLevel: (level) => dispatch(chooseLevel(level)),
        restart: () => dispatch(resetLevel(gameLevel))
    })
)(LevelChangeBoxStateless))
