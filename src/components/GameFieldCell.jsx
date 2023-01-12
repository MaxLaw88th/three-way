import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {highlightModifiers, removeHighlightModifiers} from "../store/slices/gameCells.js";

export const GameFieldCellStateless = ({cell: {value, finalValue}, highlighted, onOver, onOut}) => <ThemedElement
    box gameCell resolved={value === finalValue} highlighted={highlighted}

    Component="div"

    onMouseOver={onOver}
    onMouseOut={onOut}
>
    {value}
</ThemedElement>


export const GameFieldCell = connect((state, {fieldIndex}) => ({
    cell: state.gameCells.fields[fieldIndex],
    highlighted: state.gameCells.highlightedFields.includes(fieldIndex),
}), (dispatch, {fieldIndex}) => ({
    onOver: () => dispatch(highlightModifiers(fieldIndex)), onOut: () => dispatch(removeHighlightModifiers())
}))(GameFieldCellStateless);
