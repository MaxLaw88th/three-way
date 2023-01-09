import {ThemedElement} from "./ThemedElement";

export const GameModifierCell = ({onOver, onOut, onClick, cell: {value, active, modify, highlighted, chosen}}) =>
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
