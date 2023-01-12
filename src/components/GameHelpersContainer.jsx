import {GameGrid} from "./GameGrid.jsx";
import {GameRow, GameRowWithFog} from "./GameRow.jsx";
import {MinusModifierValue, ModifierValue, UndoModifierValue} from "./ModifierValue.jsx";
import {IdleCell} from "./IdleCell.jsx";
import {VictoryLineBox} from "./VictoryLineBox.jsx";
import {GameMovesAndTimer} from "./GameMovesAndTimer.jsx";
import {LevelChangeBox} from "./LevelChangeBox.jsx";

export const GameHelpersContainer = () => <>
    <GameGrid>
        <GameRowWithFog>
            <MinusModifierValue>-</MinusModifierValue>
            <ModifierValue valueIndex={0}/>
            <ModifierValue valueIndex={1}/>
            <ModifierValue valueIndex={2}/>
        </GameRowWithFog>
        <GameRowWithFog>
            <UndoModifierValue>U</UndoModifierValue>
            <ModifierValue valueIndex={3}/>
            <ModifierValue valueIndex={4}/>
            <ModifierValue valueIndex={5}/>
        </GameRowWithFog>
        <GameRowWithFog>
            <IdleCell/>
            <ModifierValue valueIndex={6}/>
            <ModifierValue valueIndex={7}/>
            <ModifierValue valueIndex={8}/>
        </GameRowWithFog>
        <GameRowWithFog>
            <GameMovesAndTimer/>
        </GameRowWithFog>
        <GameRow>
            <VictoryLineBox/>
        </GameRow>
        <GameRow>
            <IdleCell>L</IdleCell>
            <LevelChangeBox/>
        </GameRow>
    </GameGrid>
</>
