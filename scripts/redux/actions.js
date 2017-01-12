const constants = require('../constants');
const types = require('./actionTypes');

function loadData () {
    return (dispatch, getState) => {
        fetch('http://namegame.willowtreemobile.com:2000/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: types.LOAD_DATA_SUCCESS,
                    payload: data,
                });
            });
    }
}

function startGame () {
    return {type: types.START_GAME};
}

function toggleHints () {
    return {type: types.TOGGLE_HINTS};
}

function setBoardSize (size) {
    return {type: types.SET_BOARD_SIZE, payload: size};
}

function selectCard (i, j) {
    return (dispatch, getState) => {
        const state = getState();
        const board = state.board.slice(0);
        const first = state.firstChoiceIdx;
        let firstChoiceIdx = null;

        // Selecting the first card of a pair
        if (first === null) {
            board[i][j].flipped = !board[i][j].flipped
            firstChoiceIdx = [i, j];

            return dispatch({
                type: types.SELECT_CARD,
                payload: {board, firstChoiceIdx},
            });
        }

        const firstChoice = board[first[0]][first[1]];
        const secondChoice = board[i][j];

        // Selecting the same card twice; do nothing
        if (first[0] === i && first[1] === j) {
            return;
        }

        // Found a match
        if (firstChoice.person === secondChoice.person) {
            firstChoice.found = true;
            firstChoice.flipped = true;
            secondChoice.found = true;
            secondChoice.flipped = true;
            firstChoiceIdx = null;
            const remaining = state.remaining - 1;
            let winner = false;

            if (remaining === 0) {
                winner = true;
            }

            return dispatch({
                type: types.SELECT_CARD,
                payload: {board, firstChoiceIdx, remaining, winner},
            });
        }

        // Mismatch! Turn on the mismatch class, then set a timer
        // to turn it back off and flip the cards back over
        firstChoice.mismatch = true;
        secondChoice.flipped = true;
        secondChoice.mismatch = true;
        firstChoiceIdx = null;

        dispatch({
            type: types.SELECT_CARD,
            payload: {board, firstChoiceIdx, resetTimerRunning: true},
        });

        setTimeout(() => {
            firstChoice.flipped = false;
            firstChoice.mismatch = false;
            secondChoice.flipped = false;
            secondChoice.mismatch = false;

            dispatch({
                type: types.SELECT_CARD,
                payload: {board, firstChoiceIdx, resetTimerRunning: false},
            });
        }, 2000);
    };
}

module.exports = {
    loadData,
    startGame,
    toggleHints,
    setBoardSize,
    selectCard,
};
