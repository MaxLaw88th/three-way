import {ThemedElement} from "./ThemedElement.jsx";

export const VictoryLineBox = ({victory, flawlessVictory, started = false}) => <ThemedElement Component="div" lineBox idle>{started ? victory ? flawlessVictory ? "Flawless Victory!" : "Victory!" : "Playing..." : "Choose level"}</ThemedElement>
