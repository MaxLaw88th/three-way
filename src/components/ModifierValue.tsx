import {ThemedElement} from "./ThemedElement";
import {connect} from "react-redux";
import {invertValues} from "../store/slices/modifierValues";
import {addMovesDone, doMove, setMoveUndone} from "../store/slices/gameState";
import {addModifierValue, AddModifierValuePayload} from "../store/slices/gameCells";
import {MoveDone, RootState} from "../types";
import React, {PropsWithChildren} from "react";

type ModifierValueStatelessProps = {
    chosenModifier: number | null,
    onAddModifierValue: () => void,
    value: number
}

export const ModifierValueStateless = ({chosenModifier, onAddModifierValue, value}: ModifierValueStatelessProps) =>
    <ThemedElement
        box idle values active={chosenModifier !== null}
        Component="div"
        onClick={onAddModifierValue}
    >
        {value}
    </ThemedElement>


type ModifierValueProps = {
    valueIndex: number, chosenModifier: number, value: number
}

export const ModifierValue =
    connect(
        ({
             modifierValues,
             gameCells: {activeModifier}
         }: RootState, {valueIndex}: Pick<ModifierValueProps, "valueIndex">) => ({
            value: modifierValues[valueIndex],
            chosenModifier: activeModifier,
        }),
        (dispatch) => ({
            addMovesDone: (move: MoveDone) => dispatch(addMovesDone(move)),
            doMove: () => dispatch(doMove()),
            addModifierValue: ({
                                   value,
                                   modifier
                               }: AddModifierValuePayload) => dispatch(addModifierValue({value, modifier}))
        }),
        (stateProps, {addMovesDone, doMove, addModifierValue}) => ({
            ...stateProps,
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

type SpecialModifierValueStatelessProps = {
    active: boolean,
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const SpecialModifierValueStateless = ({
                                                  active,
                                                  onClick,
                                                  children
                                              }: PropsWithChildren<SpecialModifierValueStatelessProps>) =>
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
    ({gameState: {started, victory, movesDone}}: RootState) => ({
        active: started && !victory && movesDone.filter(el => !el.undone).length > 0,
        movesDone
    }),
    (dispatch) => ({
        addMovesDone: (move: MoveDone) => dispatch(addMovesDone(move)),
        doMove: () => dispatch(doMove()),
        addModifierValue: ({value, modifier}: AddModifierValuePayload) => dispatch(addModifierValue({
            value,
            modifier
        })),
        setMoveUndone: (move: number) => dispatch(setMoveUndone(move))
    }),
    (stateProps, {addMovesDone, doMove, addModifierValue, setMoveUndone}) => ({
        ...stateProps,
        onClick: () => {
            let toUndo = [...stateProps.movesDone].reverse().findIndex(move => !move.undone);

            if (toUndo > -1) {
                toUndo = stateProps.movesDone.length - toUndo - 1;

                const value = -stateProps.movesDone[toUndo].value;
                const modifier = stateProps.movesDone[toUndo].modifier;

                setMoveUndone(toUndo);

                addMovesDone({
                    modifier, value, time: (new Date()).toISOString(), undone: true
                });
                doMove();
                addModifierValue({value, modifier});
            }
        }
    })
)(SpecialModifierValueStateless);
