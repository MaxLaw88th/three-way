import {ThemedElement} from "./ThemedElement.js";
import {connect} from "react-redux";
import {chooseModifier, highlightFields, removeHighlightFields} from "../store/slices/gameCells";
import {ModifierCell, RootState} from "../types";

type GameModifierCellStatelessProps = {
    onOver: (cells: number[]) => void,
    onOut: (cells: number[]) => void,
    onClick: () => void,
    cell: ModifierCell,
    chosen: boolean,
    highlighted: boolean
}

type GameModifierCellProps = {
    modifierIndex: number
}

export const GameModifierCellStateless = ({
                                              onOver,
                                              onOut,
                                              onClick,
                                              cell: {value, active, modify},
                                              chosen,
                                              highlighted
                                          }: GameModifierCellStatelessProps) =>
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


export const GameModifierCell = connect(
    (state: RootState, {modifierIndex}: GameModifierCellProps) =>
        ({
            cell: state.gameCells.modifiers[modifierIndex],
            highlighted: state.gameCells.highlightedModifiers.includes(modifierIndex),
            chosen: state.gameCells.activeModifier === modifierIndex
        }),
    (dispatch, {modifierIndex}) =>
        ({
            onOver: (cells: number[]) => dispatch(highlightFields(cells)),
            onOut: () => dispatch(removeHighlightFields()),
            onClick: () => {
                dispatch(chooseModifier(modifierIndex));
            }
        })
)
(GameModifierCellStateless);
