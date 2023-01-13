import React from "react";
import {GameGridFog} from "./GameGridFog";
import classNames from "classnames";
import {ThemedElementProps} from "../types";

export const ThemedElement = (
    {
        fog = false,
        flex = false,
        column = false,
        table = false,
        box = false,
        idle = false,
        values = false,
        active = false,
        highlighted = false,
        chosen = false,
        modifier = false,
        gameCell = false,
        lineBox = false,
        resolved = false,
        restart = false,
        dispatch = null,
        Component,
        children,
        ...props
    }: ThemedElementProps) => React.createElement(Component, {
    className: `${classNames({
        flex,
        column,
        table,
        box,
        idle,
        values,
        active,
        highlighted,
        chosen,
        modifier,
        "game-cell": gameCell,
        "line-box": lineBox,
        restart,
        resolved,
    })} ${props?.className ?? ""}`,
    children: <>{children}{fog && <GameGridFog/>}</>,
    ...props
})
