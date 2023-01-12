import {connect} from "react-redux";

export const withPlayFog = connect(({gameState: {victory, started}}) => ({
    fog: !started || victory
}));
