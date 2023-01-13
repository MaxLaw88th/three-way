import {ThemedElement} from "./ThemedElement.js";
import {connect} from "react-redux";
import {highlightModifiers, removeHighlightModifiers} from "../store/slices/gameCells";
import {FieldCell, RootState} from "../types";

type GameFieldCellStatelessProps = {
    cell: FieldCell,
    highlighted: boolean,
    onOver: () => void,
    onOut: () => void
}

type GameFieldCellProps = {
    fieldIndex: number
}

export const GameFieldCellStateless = ({
                                           cell: {value, finalValue},
                                           highlighted,
                                           onOver,
                                           onOut
                                       }: GameFieldCellStatelessProps) =>
    <ThemedElement
        box
        gameCell
        resolved={value === finalValue}
        highlighted={highlighted}
        Component="div"
        onMouseOver={onOver}
        onMouseOut={onOut}
    >
        {value}
    </ThemedElement>

export const GameFieldCell = connect(
    (state: RootState, {fieldIndex}: GameFieldCellProps) =>
        ({
            cell: state.gameCells.fields[fieldIndex],
            highlighted: state.gameCells.highlightedFields.includes(fieldIndex),
        }),
    (dispatch, {fieldIndex}) =>
        ({
            onOver: () => dispatch(highlightModifiers(fieldIndex)), onOut: () => dispatch(removeHighlightModifiers())
        })
)
(GameFieldCellStateless);
