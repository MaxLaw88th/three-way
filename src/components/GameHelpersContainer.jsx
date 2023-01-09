import {GameGrid} from "./GameGrid.jsx";
import {GameRow} from "./GameRow.jsx";
import {ModifierValue, SpecialModifierValue} from "./ModifierValue.jsx";
import {IdleCell} from "./IdleCell.jsx";
import {VictoryLineBox} from "./VictoryLineBox.jsx";
import {GameMovesAndTimer} from "./GameMovesAndTimer.jsx";
import {LevelChangeBox} from "./LevelChangeBox.jsx";

export const GameHelpersContainer = ({gameLevel, restart, invertValues, values, chosenModifier, onAddModifierValue, undoMove, movesDone, victory, flawlessVictory, moves, timePassed, changeGameLevel, started, playing}) => <>
    <GameGrid>
        <GameRow fog={!playing}>
            <SpecialModifierValue onClick={invertValues} active={playing && chosenModifier}>-</SpecialModifierValue>
            <ModifierValue value={values[0]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(0)}/>
            <ModifierValue value={values[1]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(1)}/>
            <ModifierValue value={values[2]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(2)}/>
        </GameRow>
        <GameRow fog={!playing}>
            <SpecialModifierValue onClick={undoMove} active={playing && movesDone.filter(el => !el.undone).length > 0}>U</SpecialModifierValue>
            <ModifierValue value={values[3]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(3)}/>
            <ModifierValue value={values[4]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(4)}/>
            <ModifierValue value={values[5]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(5)}/>
        </GameRow>
        <GameRow fog={!playing}>
            <IdleCell/>
            <ModifierValue value={values[6]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(6)}/>
            <ModifierValue value={values[7]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(7)}/>
            <ModifierValue value={values[8]} chosenModifier={chosenModifier} onAddModifierValue={() => onAddModifierValue(8)}/>
        </GameRow>
        <GameRow fog={!playing}>
            <GameMovesAndTimer moves={moves} timePassed={timePassed}/>
        </GameRow>
        <GameRow>
            <VictoryLineBox victory={victory} flawlessVictory={flawlessVictory} started={started}/>
        </GameRow>
        <GameRow>
            <IdleCell>L</IdleCell>
            <LevelChangeBox onChangeLevel={changeGameLevel} gameLevel={gameLevel} restart={restart}/>
        </GameRow>
    </GameGrid>
</>
