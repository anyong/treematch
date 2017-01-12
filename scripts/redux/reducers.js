const utils = require('../utils');
const constants = require('../constants');
const types = require('./actionTypes');

const initialState = {
    firstGame: true,
    loading: true,
    nameList: [],
    flipped: false,
    board: [],
    rows: 3,
    cols: 4,
    boardSize: constants.MEDIUM,
    remaining: 0,
    firstChoiceIdx: null,
    found: [],
    resetTimerRunning: false,
    showHints: false,
    winner: false,
};

const initialCardState = {
    flipped: false,
    found: false,
    mismatch: false,
}

const boardSizes = {
    [constants.SMALL]: {rows: 2, cols: 3},
    [constants.MEDIUM]: {rows: 3, cols: 4},
    [constants.LARGE]: {rows: 3, cols: 6},
};

function buildCardFor (person) {
    return Object.assign({}, initialCardState, {person});
}

function countPairs (state) {
    return state.rows * state.cols / 2;
}

function buildGameBoard (state) {
    const numPairs = countPairs(state);

    // Pick the appropriate number of unique random items from the list
    const uniqueCards = utils.randomInRange(state.nameList.length, numPairs);

    // Duplicate then shuffle
    const gameCards = utils.shuffleArray(uniqueCards.concat(uniqueCards));

    // Create an empty board and fill it up
    const board = [];
    let n = 0;

    for (let i = 0; i < state.rows; i++) {
        for (let j = 0; j < state.cols; j++) {
            if (typeof board[i] === 'undefined') {
                board[i] = [];
            }

            board[i][j] = buildCardFor(gameCards[n]);
            n++;
        }
    }

    return board;
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_DATA_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                nameList: action.payload,
            });
        case types.START_GAME:
            const board = buildGameBoard(state);
            return Object.assign({}, state, {
                board,
                firstGame: false,
                remaining: countPairs(state),
            });
        case types.SET_BOARD_SIZE:
            return Object.assign({}, state,
                {boardSize: action.payload},
                boardSizes[action.payload]
            );
        case types.TOGGLE_HINTS:
            return Object.assign({}, state, {
                showHints: !state.showHints,
            });
        case types.SELECT_CARD:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

module.exports = gameReducer;
