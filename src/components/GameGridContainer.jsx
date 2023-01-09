import {GameGrid} from "./GameGrid.jsx";
import {GameRow} from "./GameRow.jsx";
import {IdleCell} from "./IdleCell.jsx";
import {GameModifierCell} from "./GameModifierCell.jsx";
import {GameFieldCell} from "./GameFieldCell.jsx";

export const GameGridContainer = ({chooseModifier, removeHighlightCells, highlightCells, highlightModifiers, removeHighlightModifiers, gameFieldCells, gameModifiers, playing}) => <>
    <GameGrid fog={!playing}>
        <GameRow>
            <IdleCell/>
            <GameModifierCell onClick={() => chooseModifier(0)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[0]}/>
            <GameModifierCell onClick={() => chooseModifier(1)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[1]}/>
            <GameModifierCell onClick={() => chooseModifier(2)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[2]}/>
            <GameModifierCell onClick={() => chooseModifier(3)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[3]}/>
            <IdleCell/>
        </GameRow>
        <GameRow>
            <GameModifierCell onClick={() => chooseModifier(4)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[4]}/>
            <GameFieldCell onOver={() => highlightModifiers(0)} onOut={removeHighlightModifiers} cell={gameFieldCells[0]}/>
            <GameFieldCell onOver={() => highlightModifiers(1)} onOut={removeHighlightModifiers} cell={gameFieldCells[1]}/>
            <GameFieldCell onOver={() => highlightModifiers(2)} onOut={removeHighlightModifiers} cell={gameFieldCells[2]}/>
            <GameFieldCell onOver={() => highlightModifiers(3)} onOut={removeHighlightModifiers} cell={gameFieldCells[3]}/>
            <IdleCell/>
        </GameRow>
        <GameRow>
            <GameModifierCell onClick={() => chooseModifier(5)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[5]}/>
            <GameFieldCell onOver={() => highlightModifiers(4)} onOut={removeHighlightModifiers} cell={gameFieldCells[4]}/>
            <GameFieldCell onOver={() => highlightModifiers(5)} onOut={removeHighlightModifiers} cell={gameFieldCells[5]}/>
            <GameFieldCell onOver={() => highlightModifiers(6)} onOut={removeHighlightModifiers} cell={gameFieldCells[6]}/>
            <GameFieldCell onOver={() => highlightModifiers(7)} onOut={removeHighlightModifiers} cell={gameFieldCells[7]}/>
            <GameModifierCell onClick={() => chooseModifier(8)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[8]}/>
        </GameRow>
        <GameRow>
            <GameModifierCell onClick={() => chooseModifier(6)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[6]}/>
            <GameFieldCell onOver={() => highlightModifiers(8)} onOut={removeHighlightModifiers} cell={gameFieldCells[8]}/>
            <GameFieldCell onOver={() => highlightModifiers(9)} onOut={removeHighlightModifiers} cell={gameFieldCells[9]}/>
            <GameFieldCell onOver={() => highlightModifiers(10)} onOut={removeHighlightModifiers} cell={gameFieldCells[10]}/>
            <GameFieldCell onOver={() => highlightModifiers(11)} onOut={removeHighlightModifiers} cell={gameFieldCells[11]}/>
            <GameModifierCell onClick={() => chooseModifier(9)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[9]}/>
        </GameRow>
        <GameRow>
            <GameModifierCell onClick={() => chooseModifier(7)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[7]}/>
            <GameFieldCell onOver={() => highlightModifiers(12)} onOut={removeHighlightModifiers} cell={gameFieldCells[12]}/>
            <GameFieldCell onOver={() => highlightModifiers(13)} onOut={removeHighlightModifiers} cell={gameFieldCells[13]}/>
            <GameFieldCell onOver={() => highlightModifiers(14)} onOut={removeHighlightModifiers} cell={gameFieldCells[14]}/>
            <GameFieldCell onOver={() => highlightModifiers(15)} onOut={removeHighlightModifiers} cell={gameFieldCells[15]}/>
            <GameModifierCell onClick={() => chooseModifier(10)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[10]}/>
        </GameRow>
        <GameRow>
            <IdleCell/>
            <IdleCell/>
            <GameModifierCell onClick={() => chooseModifier(11)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[11]}/>
            <GameModifierCell onClick={() => chooseModifier(12)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[12]}/>
            <GameModifierCell onClick={() => chooseModifier(13)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[13]}/>
            <GameModifierCell onClick={() => chooseModifier(14)} onOut={removeHighlightCells} onOver={highlightCells} cell={gameModifiers[14]}/>
        </GameRow>
    </GameGrid>
</>
