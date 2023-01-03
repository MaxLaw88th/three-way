import {useEffect, useState} from "react";
import {difficultiesLevels, getInitialGameFiledCells, getInitialsModifiers} from "./Utilities.jsx";
import {GameFieldCell} from "./components/GameFieldCell.jsx";
import {GameModifierCell} from "./components/GameModifierCell.jsx";

let timerSet;

const App = () => {

    //region states
    const [gameLevel, setGameLevel] = useState(0);

    const [gameFieldCells, setGameFieldCells] = useState(getInitialGameFiledCells());

    const [gameModifiers, setGameModifiers] = useState(getInitialsModifiers(gameLevel));

    const [chosenModifier, setChosenModifier] = useState(null);

    const [values, setValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [moves, setMoves] = useState(0);

    const [timePassed, setTimePassed] = useState(0);

    const [movesDone, setMovesDone] = useState([]);

    const [victory, setVictory] = useState(false);

    const [flawlessVictory, setFlawlessVictory] = useState(false)
    //endregion

    //region effects
    useEffect(() => {
        if (gameFieldCells.every(el => el.value === el.finalValue) && gameModifiers.every(el => (el.value <= 9 && el.value >= -9))) {
            console.log({
                movesDone,
                moves,
                tot: difficultiesLevels[gameLevel].filter(el => el).length
            })
            clearInterval(timerSet);
            setVictory(true)
            if (moves <= difficultiesLevels[gameLevel].filter(el => el).length) {
                setFlawlessVictory(true);
            }
        }

    }, [gameFieldCells])

    useEffect(() => {
        if (timerSet)
            clearInterval(timerSet);
        timerSet = setInterval(() => setTimePassed(t => ++t), 1000);
        return () => clearInterval(timerSet)
    }, [gameLevel])

    useEffect(() => {
        changeGameLevel(gameLevel);
    }, [1])

    useEffect(() => {
        console.log("chosen modifier", chosenModifier)

        setGameModifiers(cells => {
            const newCells = [...cells].map(el => ({
                ...el,
                chosen: false
            }));

            if (chosenModifier !== null) {
                newCells[chosenModifier].chosen = true;
            }

            return newCells;
        })

    }, [chosenModifier])

    useEffect(() => {
        console.log(movesDone)
    }, [movesDone])
    //endregion

    //region handlers
    const changeGameLevel = (level) => {

        const newGameModifiers = getInitialsModifiers(level);

        const newGameFieldCells = [...getInitialGameFiledCells()];

        [...newGameModifiers].map(mod => {
            mod.value = mod.active ? Math.ceil(Math.random() * 9999) % 18 - 9 : null;
            return mod;
        }).forEach(mod => {
            mod.modify.forEach(cellPos => {
                newGameFieldCells[cellPos].value += mod.value;
            })
            mod.value = mod.active ? 0 : null;
        })

        setGameLevel(level)

        setGameModifiers(newGameModifiers);

        setMoves(0);
        setChosenModifier(null);
        setTimePassed(0);
        setVictory(false);
        setFlawlessVictory(false);

        setGameFieldCells(newGameFieldCells)
    }

    const highlightCells = (cellsPos) => {
        setGameFieldCells(cells => {

            const newCells = [...cells];

            cellsPos.forEach(pos => {
                newCells[pos].highlighted = true
            });

            return newCells;
        })
    }

    const removeHighlightCells = (cellsPos) => {
        setGameFieldCells(cells => {

            const newCells = [...cells];

            cellsPos.forEach(pos => {
                newCells[pos].highlighted = false
            });

            return newCells;
        })
    }

    const highlightModifiers = (cellPos) => () => {
        setGameModifiers(
            cells =>
                [...cells].map(mod => ({
                    ...mod,
                    highlighted: mod.modify.includes(cellPos) && mod.active
                }))
        )
    }

    const removeHighlightModifiers = () => {
        setGameModifiers(
            cells =>
                [...cells].map(mod => ({
                    ...mod,
                    highlighted: false
                }))
        )
    }

    const undoMove = () => {
        let toUndo = [...movesDone].reverse().findIndex(move => !move.undone);

        if (toUndo > -1) {

            toUndo = movesDone.length - toUndo - 1;

            const newMovesDone = [...movesDone];

            newMovesDone[toUndo].undone = true;

            setMovesDone(newMovesDone);

            addModifierValue(newMovesDone[toUndo].modifier, -newMovesDone[toUndo].value, true)
        }
    }

    const addModifierValue = (modifierPos, valueToAdd, undone = false) => {
        const newModifiers = [...gameModifiers];
        const newCells = [...gameFieldCells];

        newModifiers[modifierPos].value += valueToAdd;
        gameModifiers[modifierPos].modify.forEach(cellPos => {
            newCells[cellPos].value += valueToAdd;
        })

        setChosenModifier(null);
        setGameModifiers(newModifiers);
        setGameFieldCells(newCells);
        setMoves(actMoves => ++actMoves)
        setMovesDone([...movesDone, {
            modifier: modifierPos,
            value: valueToAdd,
            time: (new Date()).toISOString(),
            undone
        }]);
    }

    const onAddModifierValue = pos => () => {
        if (chosenModifier !== null) {
            console.log("modify", chosenModifier, "with", pos);
            addModifierValue(chosenModifier, values[pos]);
        }
    };

    const chooseModifier = (pos) => () => {
        if (gameModifiers?.[pos]?.active)
            setChosenModifier(pos);
    }

    const invertValues = () => {
        setValues(actValues => [...actValues].map(val => -val));
    }
    //endregion

    //region factories
    const makeGameCell = pos =>
        <GameFieldCell
            onOver={highlightModifiers(pos)}
            onOut={removeHighlightModifiers}
            cell={gameFieldCells[pos]}
        />

    const makeModCell = (pos) =>
        <GameModifierCell
            onClick={chooseModifier(pos)}
            onOut={removeHighlightCells}
            onOver={highlightCells}
            cell={gameModifiers[pos]}
        />;
    const makeModifierValue = pos => <div className={`box idle values ${chosenModifier !== null ? 'active' : ''}`} onClick={onAddModifierValue(pos)}>{values[pos]}</div>
    //endregion

    //region render
    return <div>
        <div className="flex column table">
            <div className="flex" id="row-1">
                <div className="box"></div>
                {makeModCell(0)}
                {makeModCell(1)}
                {makeModCell(2)}
                {makeModCell(3)}
                <div className="box"></div>
            </div>
            <div className="flex" id="row-2">
                {makeModCell(4)}
                {makeGameCell(0)}
                {makeGameCell(1)}
                {makeGameCell(2)}
                {makeGameCell(3)}
                <div className="box"></div>
            </div>
            <div className="flex" id="row-3">
                {makeModCell(5)}
                {makeGameCell(4)}
                {makeGameCell(5)}
                {makeGameCell(6)}
                {makeGameCell(7)}
                {makeModCell(8)}
            </div>
            <div className="flex" id="row-4">
                {makeModCell(6)}
                {makeGameCell(8)}
                {makeGameCell(9)}
                {makeGameCell(10)}
                {makeGameCell(11)}
                {makeModCell(9)}
            </div>
            <div className="flex" id="row-5">
                {makeModCell(7)}
                {makeGameCell(12)}
                {makeGameCell(13)}
                {makeGameCell(14)}
                {makeGameCell(15)}
                {makeModCell(10)}
            </div>
            <div className="flex" id="row-6">
                <div className="box"></div>
                <div className="box"></div>
                {makeModCell(11)}
                {makeModCell(12)}
                {makeModCell(13)}
                {makeModCell(14)}
            </div>
        </div>
        <div className="flex column table">
            <div className="flex">
                <div className={`box idle values active`} onClick={invertValues}>-</div>
                {makeModifierValue(0)}
                {makeModifierValue(1)}
                {makeModifierValue(2)}
            </div>
            <div className="flex">
                <div className={`box idle values ${movesDone.filter(el => !el.undone).length > 0 ? 'active' : ''}`} onClick={undoMove}>U</div>
                {makeModifierValue(3)}
                {makeModifierValue(4)}
                {makeModifierValue(5)}
            </div>
            <div className="flex">
                <div className="box"></div>
                {makeModifierValue(6)}
                {makeModifierValue(7)}
                {makeModifierValue(8)}
            </div>
            <div className="flex">
                <div className="line-box idle">{victory ? flawlessVictory ? "Flawless Victory!" : "Victory!" : "Playing..."}</div>
            </div>
            <div className="flex">
                <div className="line-box idle values">Moves: {moves} - Sec. {timePassed}</div>
            </div>
            <div className="flex">
                <div className="box">L</div>
                <div onClick={() => changeGameLevel(0)} className="box">1</div>
                <div onClick={() => changeGameLevel(1)} className="box">2</div>
                <div onClick={() => changeGameLevel(2)} className="box">3</div>
            </div>
        </div>
    </div>;
    //endregion
};

export default App
