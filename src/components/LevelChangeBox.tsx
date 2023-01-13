import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {chooseLevel, resetLevel} from "../store/slices/gameState";
import {AppDispatch, RootState} from "../types";

type LevelChangeBoxStatelessProps = { onChangeLevel: (level: number) => void, gameLevel: number | null, restart: () => void }

export const LevelChangeBoxStateless = ({onChangeLevel, gameLevel, restart}: LevelChangeBoxStatelessProps) => <>
    <ThemedElement restart={gameLevel === 0} Component="div" box
                   onClick={() => gameLevel === 0 ? restart() : onChangeLevel(0)}>{gameLevel === 0 ?
        <span style={{color: "red"}}>R</span> : "1"}</ThemedElement>
    <ThemedElement restart={gameLevel === 1} Component="div" box
                   onClick={() => gameLevel === 1 ? restart() : onChangeLevel(1)}>{gameLevel === 1 ?
        <span style={{color: "red"}}>R</span> : "2"}</ThemedElement>
    <ThemedElement restart={gameLevel === 2} Component="div" box
                   onClick={() => gameLevel === 2 ? restart() : onChangeLevel(2)}>{gameLevel === 2 ?
        <span style={{color: "red"}}>R</span> : "3"}</ThemedElement>
</>

export const LevelChangeBox = connect(
    (state: RootState) => ({
        gameLevel: state.gameState.gameLevel
    }),
    (dispatch: AppDispatch) => ({
        chooseLevel: (level: number) => dispatch(chooseLevel(level)),
        resetLevel: (gameLevel: number) => dispatch(resetLevel(gameLevel))
    }),
    (stateProps, dispatchProps) => ({
        ...stateProps,
        onChangeLevel: (level: number) => dispatchProps.chooseLevel(level),
        restart: () => dispatchProps.resetLevel(stateProps.gameLevel as number)
    })
)(LevelChangeBoxStateless)
