import {useEffect, useState} from "react";
import {difficultiesLevels, getInitialGameFiledCells, getInitialsModifiers, initialGameFieldCells, initialModifiers} from "./utils/index.jsx";
import {useTimer} from "./hooks/useTimer.jsx";
import {GameGridContainer, GameHelpersContainer} from "./components/index.js";

const App = () => {
    //region states

    // la partita (è/non è) cominciata
    const [started, setStarted] = useState(false);
    // quante mosse sono state fatte
    const [moves, setMoves] = useState(0);
    // la partita (è/non è) stata vinta
    const [victory, setVictory] = useState(false);
    // la vittoria (è/non è) stata impeccabile:
    // sono state compiute al più il numero di mosse
    // equivalente ai modificatori applicati
    const [flawlessVictory, setFlawlessVictory] = useState(false);
    // custom hook per gestire il timer
    const [timePassed, , stopTimer, resetTimer] = useTimer();

    //livello del gioco
    const [gameLevel, setGameLevel] = useState(null);

    // celle del campo da gioco
    const [gameFieldCells, setGameFieldCells] = useState([...initialGameFieldCells]);
    // celle dei modificatori
    const [gameModifiers, setGameModifiers] = useState([...initialModifiers]);

    // modificatore attivo
    const [chosenModifier, setChosenModifier] = useState(null);
    // valori applicabili
    const [values, setValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // storico delle mosse (registra il modificatore, il valore e se questa mossa è stata annullata)
    const [movesDone, setMovesDone] = useState([]);
    //endregion

    //region effects

    // al cambio di livello
    useEffect(() => {
        if (gameLevel === null) return;
        restartGame();
    }, [gameLevel])

    // al cambio di una casella
    useEffect(() => {
        // controlla lo stato della partita per assegnare la vittoria
        if (
            // la partita è cominciata
            started &&
            // ogni casella ha assunto il suo valore finale
            gameFieldCells.every(el => el.value === el.finalValue) &&
            // ogni modificatore attivo ha un valore compreso tra -9 e 9
            gameModifiers.every(el => !el.active || (el.value <= 9 && el.value >= -9))
        ) {
            // imposta la partita come vinta
            setVictory(true)
            // imposta la vittoria come impeccabile se il numero di mosse fatte
            // è minore o uguale al numero di modificatori
            setFlawlessVictory(moves <= difficultiesLevels[gameLevel].filter(el => el).length);
            //interrompe il timer
            stopTimer();
        }
    }, [gameFieldCells])

    // al cambio del modificatore scelto
    useEffect(() => {
        // se la partita è cominciata imposta un modificatore come selezionato
        // se corrisponde a quello effettivamente selezionato
        started && setGameModifiers([...gameModifiers].map((el, pos) => ({...el, chosen: pos === chosenModifier})));
    }, [chosenModifier])
    //endregion

    //region handlers

    const restartGame = () => {
        // crea nuove caselle e modificatori
        const newGameFieldCells = [...getInitialGameFiledCells()];
        const newGameModifiers = [...getInitialsModifiers(gameLevel)].map(mod => ({
            ...mod, value: mod.active ? Math.ceil(Math.random() * 9999) % 18 - 9 : null
        }));

        newGameModifiers.forEach(mod => {
            //assegna i valori dei modificatori alle caselle
            mod.modify.forEach(cellPos => {
                newGameFieldCells[cellPos].value += mod.value;
            })
            // riporta allo stato iniziale i modificatori
            mod.value = mod.active ? 0 : null;
        });

        // imposta tutti gli stati necessari per cominciare la partita
        setGameModifiers(newGameModifiers);
        setGameFieldCells(newGameFieldCells);
        setChosenModifier(null);
        setStarted(true);
        setVictory(false);
        setFlawlessVictory(false);
        setMoves(0);
        resetTimer();
    }

    // cambia il livello del gioco
    const changeGameLevel = (level) => {
        setGameLevel(level)
    }

    // aggiunge lo stato di "evidenziata" a un gruppo di caselle
    const highlightCells = (cellsPos) => {
        setGameFieldCells(cells => [...cells].map((cell, pos) => ({
            ...cell, highlighted: cellsPos.includes(pos)
        })))
    }

    // rimuove lo stato di "evidenziata" da tutte le caselle
    const removeHighlightCells = () => {
        setGameFieldCells(cells => [...cells].map(cell => ({...cell, highlighted: false})))
    }

    // aggiunge lo stato di "evidenziata" a un gruppo di modificatori
    const highlightModifiers = (cellPos) => {
        setGameModifiers([...gameModifiers].map(mod => ({
            ...mod, highlighted: mod.modify.includes(cellPos) && mod.active
        })))
    };

    // rimuove lo stato di "evidenziata" da tutti i modificatori
    const removeHighlightModifiers = () => {
        setGameModifiers([...gameModifiers].map(mod => ({...mod, highlighted: false})))
    }

    // annulla l'ultima mossa
    const undoMove = () => {
        //prende l'ultima mossa non annullata
        let toUndo = [...movesDone].reverse().findIndex(move => !move.undone);

        // se ce n'è una la mette in stato di annullata
        // applica la mossa alla partita
        if (toUndo > -1) {
            toUndo = movesDone.length - toUndo - 1;
            const newMovesDone = [...movesDone];
            newMovesDone[toUndo].undone = true;
            setMovesDone(newMovesDone);
            addModifierValue(newMovesDone[toUndo].modifier, -newMovesDone[toUndo].value, true)
        }
    }

    // aggiunge un valore a un modificatore e al gruppo di caselle a cui è legato
    const addModifierValue = (modifierPos, valueToAdd, undone = false) => {
        // copia caselle e modificatori
        const newModifiers = [...gameModifiers];
        const newCells = [...gameFieldCells];

        // aggiunge il valore al modificatore scelto
        newModifiers[modifierPos].value += valueToAdd;
        // aggiunge il valore a tutte le caselle a cui il modificatore è legato
        gameModifiers[modifierPos].modify.forEach(cellPos => {
            newCells[cellPos].value += valueToAdd;
        })

        // aggiunge la mossa allo storico
        setMovesDone([...movesDone, {
            modifier: modifierPos, value: valueToAdd, time: (new Date()).toISOString(), undone
        }]);

        // incrementa le mosse effettuate
        setMoves(actMoves => ++actMoves)

        // reimposta il modificatore attivo
        setChosenModifier(null);

        // applica i nuovi valori allo stato
        // dei modificatori e delle caselle
        setGameModifiers(newModifiers);
        setGameFieldCells(newCells);
    }

    // handler per l'aggiunta di un valore al modificare scelto
    const onAddModifierValue = pos => {
        if (chosenModifier !== null) addModifierValue(chosenModifier, values[pos]);
    };

    // imposta il modificatore scelto
    const onChooseModifier = (pos) => {
        if (gameModifiers?.[pos]?.active) setChosenModifier(pos);
    };

    // inverte il segno dei valori che si possono utilizzare
    const onInvertValues = () => {
        setValues([...values].map(val => -val));
    }
    //endregion

    //region render
    return <div>
        <GameGridContainer
            playing={started && !victory}
            gameModifiers={gameModifiers}
            chooseModifier={onChooseModifier}
            gameFieldCells={gameFieldCells}
            highlightCells={highlightCells}
            highlightModifiers={highlightModifiers}
            removeHighlightCells={removeHighlightCells}
            removeHighlightModifiers={removeHighlightModifiers}
        />
        <GameHelpersContainer
            flawlessVictory={flawlessVictory}
            victory={victory}
            chosenModifier={chosenModifier}
            timePassed={timePassed}
            moves={moves}
            onAddModifierValue={onAddModifierValue}
            values={values}
            movesDone={movesDone}
            changeGameLevel={changeGameLevel}
            invertValues={onInvertValues}
            undoMove={undoMove}
            playing={started && !victory}
            started={started}
            gameLevel={gameLevel}
            restart={restartGame}
        />
    </div>;
    //endregion
};

export default App
