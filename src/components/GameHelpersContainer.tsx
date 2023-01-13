import {GameGrid} from "./GameGrid";
import {GameRow, GameRowWithFog} from "./GameRow";
import {MinusModifierValue, ModifierValue, UndoModifierValue} from "./ModifierValue";
import {IdleCell} from "./IdleCell";
import {VictoryLineBox} from "./VictoryLineBox";
import {GameMovesAndTimer} from "./GameMovesAndTimer";
import {LevelChangeBox} from "./LevelChangeBox";

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
