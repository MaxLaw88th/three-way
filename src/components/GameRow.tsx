import {ThemedElement} from "./ThemedElement";
import {withPlayFog} from "../store/connectors/WithPlayFog";
import {ThemedElementProps} from "../types";

export const GameRow = (props: Partial<ThemedElementProps>) => <ThemedElement Component={"div"} {...props} flex/>;

export const GameRowWithFog = withPlayFog(GameRow);
