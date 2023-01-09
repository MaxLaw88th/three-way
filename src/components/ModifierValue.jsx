import {ThemedElement} from "./ThemedElement";

export const ModifierValue = ({chosenModifier, onAddModifierValue, value}) =>
    <ThemedElement
        box idle values active={chosenModifier !== null}
        Component="div"
        onClick={onAddModifierValue}
    >
        {value}
    </ThemedElement>

export const SpecialModifierValue = ({active, onClick, children}) =>
    <ThemedElement
        box idle values active={active}
        Component="div"
        onClick={onClick}
        children={children}
    />;
