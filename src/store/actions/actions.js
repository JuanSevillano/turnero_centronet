import * as actionTypes from './actionTypes';

export const generateTurn = () => ({
    type: actionTypes.GENERATE_TURN
})

export const callTurn = number => ({
    type: actionTypes.CALL_TURN,
    payload: number
})

export const saveTurn = number => ({
    type: actionTypes.SAVE_TURN,
    payload: number
})

export const updateTurn = (number, status) => ({
    type: actionTypes.UPDATE_TURN,
    payload: { number, status }
})


