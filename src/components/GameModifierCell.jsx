import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {chooseModifier, highlightFields, removeHighlightFields} from "../store/slices/gameCells.js";

export const GameModifierCellStateless = ({onOver, onOut, onClick, cell: {value, active, modify}, chosen, highlighted}) =>
    <ThemedElement
        box
        idle
        modifier
        highlighted={highlighted}
        chosen={chosen}

        Component="div"

        onClick={onClick}
        onMouseOver={() => active ? onOver(modify) : null}
        onMouseOut={() => onOut(modify)}
    >
        {value}
    </ThemedElement>


export const GameModifierCell = connect((state, {modifierIndex}) => ({
    cell: state.gameCells.modifiers[modifierIndex],
    highlighted: state.gameCells.highlightedModifiers.includes(modifierIndex),
    chosen: state.gameCells.activeModifier === modifierIndex
}), (dispatch, {modifierIndex}) => ({
    onOver: (cells) => dispatch(highlightFields(cells)),
    onOut: () => dispatch(removeHighlightFields()),
    onClick: () => {
        dispatch(chooseModifier(modifierIndex));
    }
}))(GameModifierCellStateless);
