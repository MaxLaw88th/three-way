import {GameGridWithFog} from "./GameGrid.jsx";
import {GameRow} from "./GameRow.jsx";
import {IdleCell} from "./IdleCell.jsx";
import {GameModifierCell} from "./GameModifierCell.jsx";
import {GameFieldCell} from "./GameFieldCell.jsx";

export const GameGridContainer = () => <>
    <GameGridWithFog>
        <GameRow>
            <IdleCell/>
            <GameModifierCell modifierIndex={0}/>
            <GameModifierCell modifierIndex={1}/>
            <GameModifierCell modifierIndex={2}/>
            <GameModifierCell modifierIndex={3}/>
            <IdleCell/>
        </GameRow>
        <GameRow>
            <GameModifierCell modifierIndex={4}/>
            <GameFieldCell fieldIndex={0}/>
            <GameFieldCell fieldIndex={1}/>
            <GameFieldCell fieldIndex={2}/>
            <GameFieldCell fieldIndex={3}/>
            <IdleCell/>
        </GameRow>
        <GameRow>
            <GameModifierCell modifierIndex={5}/>
            <GameFieldCell fieldIndex={4}/>
            <GameFieldCell fieldIndex={5}/>
            <GameFieldCell fieldIndex={6}/>
            <GameFieldCell fieldIndex={7}/>
            <GameModifierCell modifierIndex={8}/>
        </GameRow>
        <GameRow>
            <GameModifierCell modifierIndex={6}/>
            <GameFieldCell fieldIndex={8}/>
            <GameFieldCell fieldIndex={9}/>
            <GameFieldCell fieldIndex={10}/>
            <GameFieldCell fieldIndex={11}/>
            <GameModifierCell modifierIndex={9}/>
        </GameRow>
        <GameRow>
            <GameModifierCell modifierIndex={7}/>
            <GameFieldCell fieldIndex={12}/>
            <GameFieldCell fieldIndex={13}/>
            <GameFieldCell fieldIndex={14}/>
            <GameFieldCell fieldIndex={15}/>
            <GameModifierCell modifierIndex={10}/>
        </GameRow>
        <GameRow>
            <IdleCell/>
            <IdleCell/>
            <GameModifierCell modifierIndex={11}/>
            <GameModifierCell modifierIndex={12}/>
            <GameModifierCell modifierIndex={13}/>
            <GameModifierCell modifierIndex={14}/>
        </GameRow>
    </GameGridWithFog>
</>
