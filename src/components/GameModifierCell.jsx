export const GameModifierCell = ({cell, onOver, onOut, onClick}) => {

    const {value, active, modify, highlighted, chosen} = cell;

    return <div
        onClick={onClick}
        onMouseOver={() => active ? onOver(modify) : null}
        onMouseOut={() => onOut(modify)}
        className={`box idle modifier ${highlighted ? 'highlighted' : ''} ${chosen ? 'chosen' : ''}`}
    >
        {value}
    </div>;
}
