import {range, shuffle} from "lodash";

export const getInitialGameFiledCells = () => range(1, 17).map(value => ({
    value: value,
    finalValue: value,
    highlighted: false,
    chosen: false,
}));

export const initialGameFieldCells = getInitialGameFiledCells();

const makeModifier = ({active, modify, value = 0, highlighted = false}) => ({
    value,
    active,
    modify,
    highlighted
});
export const difficultiesLevels = [
    [true, true, true, true, true, true, false, false, false, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true, true, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
];
export const getInitialsModifiers = (level) => {

    const difficultiesRandom = shuffle([...difficultiesLevels[level]]);

    return [

        //region columns modifiers
        makeModifier({
            value: 0,
            active: difficultiesRandom[0],
            modify: [0, 4, 8, 12],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[1],
            modify: [1, 5, 9, 13],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[2],
            modify: [2, 6, 10, 14],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[3],
            modify: [3, 7, 11, 15],
            highlighted: false,
        }),
        //endregion

        //region row modifiers
        makeModifier({
            value: 0,
            active: difficultiesRandom[4],
            modify: [0, 1, 2, 3],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[5],
            modify: [4, 5, 6, 7],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[6],
            modify: [8, 9, 10, 11],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[7],
            modify: [12, 13, 14, 15],
            highlighted: false,
        }),
        //endregion

        //region diagonals modifiers
        makeModifier({
            value: 0,
            active: difficultiesRandom[8],
            modify: [3],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[9],
            modify: [2, 7],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[10],
            modify: [1, 6, 11],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[11],
            modify: [12],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[12],
            modify: [8, 13],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[13],
            modify: [4, 9, 14],
            highlighted: false,
        }),
        makeModifier({
            value: 0,
            active: difficultiesRandom[14],
            modify: [0, 5, 10, 15],
            highlighted: false,
        }),
        //endregion
    ];
};


export const initialModifiers = getInitialsModifiers(0);
