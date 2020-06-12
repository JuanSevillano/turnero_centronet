import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const ipc = window.ipcRenderer

const initialTurns = new Array(999).fill().map(t => ({ status: actionTypes.ORDER_FREE }))
const initialState = {
    turns: initialTurns,
    currentTurn: null
}


const sendMessage = (channel, message) => {
    if (channel !== null && message !== null) {
        ipc.send(channel, message)
    }
}

const generateTurn = (state, payload) => {
    const number = state.turns.findIndex((t, i) => i !== 0 ? t.status === actionTypes.ORDER_FREE : null)
    const updated = [...state.turns]
    updated[number].status = actionTypes.ORDER_WAITING
    sendMessage('waiting', { number: number, turn: updated[number] })
    return updateObject(state, {
        turns: updated,
        currentTurn: +number
    })
}

const callTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number)
    turn.status = actionTypes.ORDER_DELIVERING
    const updatedTurns = [...state.turns]
    updatedTurns[number] = turn
    sendMessage('call', { number: number, turn: updatedTurns[number] })
    return updateObject(state, {
        turns: updatedTurns
    })
}

const saveTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number)
    turn.status = actionTypes.ORDER_FREE
    const updatedTurns = [...state.turns]
    updatedTurns[number] = turn
    sendMessage('save', { number: number, turn: updatedTurns[number] })
    return updateObject(state, {
        turns: updatedTurns,
        currentTurn: +number
    })
}

const updateTurn = (state, message) => {
    const turn = message.number.turn
    const updatedTurns = [...state.turns]
    updatedTurns[message.number.number] = turn
    return updateObject(state, {
        turns: updatedTurns
    })
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.GENERATE_TURN: return generateTurn(state, payload)
        case actionTypes.CALL_TURN: return callTurn(state, payload)
        case actionTypes.SAVE_TURN: return saveTurn(state, payload)
        case actionTypes.UPDATE_TURN: return updateTurn(state, payload)
        default: return state
    }
}

export default reducer

