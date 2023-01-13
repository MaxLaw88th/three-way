import {GameGridContainer, GameHelpersContainer} from "./components";
import {useGameVictoryController} from "./hooks/useGameVictoryController";

const App = () => {
    useGameVictoryController();
    return <div>
        <GameGridContainer/>
        <GameHelpersContainer/>
    </div>;
};

export default App
