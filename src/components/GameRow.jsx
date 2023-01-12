import {ThemedElement} from "./ThemedElement.jsx";
import {withPlayFog} from "../store/connectors/WithPlayFog.jsx";

export const GameRow = props => <ThemedElement Component={"div"} {...props} flex/>;

export const GameRowWithFog = withPlayFog(GameRow);
