import {ThemedElement} from "./ThemedElement";
import {withPlayFog} from "../store/connectors/WithPlayFog";
import {PropsWithChildren} from "react";


export const GameGrid = (props: PropsWithChildren) => <ThemedElement Component={"div"} {...props} flex column table/>;

export const GameGridWithFog = withPlayFog(GameGrid)
