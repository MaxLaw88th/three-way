import {connect} from "react-redux";
import {RootState} from "../../types";

export const withPlayFog = connect(({gameState: {victory, started}}: RootState) => ({
    fog: !started || victory
}));
