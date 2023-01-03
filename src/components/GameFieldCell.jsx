export const GameFieldCell = ({cell, onOver, onOut}) => {
    const {value, finalValue, highlighted} = cell;
    return <div
        onMouseOver={onOver}
        onMouseOut={onOut}
        className={`box game-cell ${value === finalValue ? "resolved" : "idle"} ${highlighted ? 'highlighted' : ''}`}
    >
        {value}
    </div>;
}
