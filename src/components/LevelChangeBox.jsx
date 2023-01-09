import {ThemedElement} from "./ThemedElement.jsx";

export const LevelChangeBox = ({onChangeLevel, gameLevel, restart}) => <>
    <ThemedElement restart={gameLevel === 0} Component="div" box onClick={() => gameLevel === 0 ? restart() : onChangeLevel(0)}>{gameLevel === 0 ? <span style={{color:"red"}}>R</span> : "1"}</ThemedElement>
    <ThemedElement restart={gameLevel === 1} Component="div" box onClick={() => gameLevel === 1 ? restart() : onChangeLevel(1)}>{gameLevel === 1 ? <span style={{color:"red"}}>R</span> : "2"}</ThemedElement>
    <ThemedElement restart={gameLevel === 2} Component="div" box onClick={() => gameLevel === 2 ? restart() : onChangeLevel(2)}>{gameLevel === 2 ? <span style={{color:"red"}}>R</span> : "3"}</ThemedElement>
</>
