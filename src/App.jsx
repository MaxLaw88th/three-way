import {GameGridContainer, GameHelpersContainer} from "./components/index.js";
import {useGameVictoryController} from "./hooks/useGameVictoryController.jsx";

const App = () => {

    useGameVictoryController();

    //region render
    return <div>
        <GameGridContainer/>
        <GameHelpersContainer/>
    </div>;
    //endregion
};

export default App
