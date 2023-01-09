import {ThemedElement} from "./ThemedElement";

export const GameFieldCell = ({cell: {value, finalValue, highlighted}, onOver, onOut}) =>
    <ThemedElement
        box gameCell resolved={value === finalValue} highlighted={highlighted}

        Component="div"

        onMouseOver={onOver}
        onMouseOut={onOut}
    >
        {value}
    </ThemedElement>
