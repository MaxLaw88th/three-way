import {ThemedElement} from "./ThemedElement.jsx";
import {withPlayFog} from "../store/connectors/WithPlayFog.jsx";


export const GameGrid = (props) => <ThemedElement Component={"div"} {...props} flex column table/>;

export const GameGridWithFog = withPlayFog(GameGrid)
