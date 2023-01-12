import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {invertValues} from "../store/slices/modifierValues.js";
import {addMovesDone, doMove, setMoveUndone} from "../store/slices/gameState.js";
import {addModifierValue} from "../store/slices/gameCells.js";

export const ModifierValueStateless = ({chosenModifier, onAddModifierValue, value}) =>
    <ThemedElement
        box idle values active={chosenModifier !== null}
        Component="div"
        onClick={onAddModifierValue}
    >
        {value}
    </ThemedElement>

export const ModifierValue =
    connect(
        ({modifierValues, gameCells: {activeModifier}}, {valueIndex}) => ({
            value: modifierValues[valueIndex],
            chosenModifier: activeModifier,
        }),
        (dispatch, {valueIndex, chosenModifier, value}) => ({
            addMovesDone: (move) => dispatch(addMovesDone(move)),
            doMove: () => dispatch(doMove()),
            addModifierValue: ({value, modifier}) => dispatch(addModifierValue({value, modifier}))
        }),
        (stateProps, {addMovesDone, doMove, addModifierValue}, ownProps) => ({
            ...stateProps,
            ...ownProps,
            onAddModifierValue: () => {
                const value = stateProps.value;
                const modifier = stateProps.chosenModifier;
                if (modifier === null) return;

                // aggiunge la mossa allo storico
                addMovesDone({
                    modifier: modifier, value: value, time: (new Date()).toISOString(), undone: false
                });
                // incrementa le mosse effettuate
                doMove();
                addModifierValue({value, modifier});
            }
        })
    )(ModifierValueStateless);

export const SpecialModifierValueStateless = ({active, onClick, children}) =>
    <ThemedElement
        box idle values active={active}
        Component="div"
        onClick={onClick}
        children={children}
    />;

export const MinusModifierValue = connect(
    ({gameState: {started, victory}, gameCells: {activeModifier}}) => ({
        active: started && !victory && activeModifier
    }),
    dispatch => ({
        onClick: () => dispatch(invertValues()),
    })
)(SpecialModifierValueStateless);

export const UndoModifierValue = connect(
    ({gameState: {started, victory, movesDone}}) => ({
        active: started && !victory && movesDone.filter(el => !el.undone).length > 0,
        movesDone
    }),
    (dispatch, {valueIndex, chosenModifier, value}) => ({
        addMovesDone: (move) => dispatch(addMovesDone(move)),
        doMove: () => dispatch(doMove()),
        addModifierValue: ({value, modifier}) => dispatch(addModifierValue({value, modifier})),
        setMoveUndone: (move) => dispatch(setMoveUndone(move))
    }),
    (stateProps, {addMovesDone, doMove, addModifierValue, setMoveUndone}, ownProps) => ({
        ...stateProps,
        ...ownProps,
        onClick: () => {
            let toUndo = [...stateProps.movesDone].reverse().findIndex(move => !move.undone);

            if (toUndo > -1) {
                toUndo = stateProps.movesDone.length - toUndo - 1;

                const value = -stateProps.movesDone[toUndo].value;
                const modifier = stateProps.movesDone[toUndo].modifier;

                setMoveUndone(toUndo);

                // aggiunge la mossa allo storico
                addMovesDone({
                    modifier, value, time: (new Date()).toISOString(), undone: true
                });
                // incrementa le mosse effettuate
                doMove();
                addModifierValue({value, modifier});
            }
        }
    })
)(SpecialModifierValueStateless);
