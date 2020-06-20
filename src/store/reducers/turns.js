import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
<<<<<<< HEAD
=======

>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
const ipc = window.ipcRenderer

const initialTurns = new Array(999).fill().map(t => ({ status: actionTypes.ORDER_FREE }))
const initialState = {
    turns: initialTurns,
<<<<<<< HEAD
    currentTurn: null,
    loading: false,
    error: null
}

=======
    currentTurn: null
}


>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
const sendMessage = (channel, message) => {
    if (channel !== null && message !== null) {
        ipc.send(channel, message)
    }
}

<<<<<<< HEAD
const savePersistance = state => sendMessage('backup_save', state)

=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
const generateTurn = (state, payload) => {
    const number = state.turns.findIndex((t, i) => i !== 0 ? t.status === actionTypes.ORDER_FREE : null)
    const updated = [...state.turns]
    updated[number].status = actionTypes.ORDER_WAITING
    sendMessage('waiting', { number: number, turn: updated[number] })
<<<<<<< HEAD
    const newOne = updateObject(state, {
        turns: updated,
        currentTurn: +number
    })
    savePersistance(newOne)
    return newOne
=======
    return updateObject(state, {
        turns: updated,
        currentTurn: +number
    })
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
}

const callTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number && t.status === actionTypes.ORDER_WAITING)
    if (turn) {
        turn.status = actionTypes.ORDER_DELIVERING
        const updatedTurns = [...state.turns]
        updatedTurns[number] = turn
        sendMessage('call', { number: number, turn: updatedTurns[number] })
<<<<<<< HEAD
        const newOne = updateObject(state, {
            turns: updatedTurns
        })
        savePersistance(newOne)
        return newOne
=======
        return updateObject(state, {
            turns: updatedTurns
        })
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
    } else {
        return state
    }
}

const saveTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number)
    turn.status = actionTypes.ORDER_FREE
    const updatedTurns = [...state.turns]
    updatedTurns[number] = turn
    sendMessage('save', { number: number, turn: updatedTurns[number] })
<<<<<<< HEAD
    const newCurrent = +number
    const newOne = updateObject(state, {
        turns: updatedTurns,
        currentTurn: newCurrent - 1
    })
    savePersistance(newOne)
    return newOne
=======
    return updateObject(state, {
        turns: updatedTurns,
        currentTurn: +number
    })
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
}

const updateTurn = (state, message) => {
    const turn = message.number.turn
    const updatedTurns = [...state.turns]
    updatedTurns[message.number.number] = turn
<<<<<<< HEAD
    const newOne = updateObject(state, {
        turns: updatedTurns
    })
    savePersistance(newOne)
    return newOne
}

const loadBackupStart = state => {
    sendMessage('backup', 'start')
    return updateObject(state, { loading: true })
}

const setPreviousState = (state, prevState) => {
    sendMessage('all', prevState)
    const updated = JSON.parse(prevState)
    return updateObject(state, updated)
}

const loadBackupFailed = (state, err) => {
    return updateObject(state, { error: err })
=======
    return updateObject(state, {
        turns: updatedTurns
    })
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.GENERATE_TURN: return generateTurn(state, payload)
        case actionTypes.CALL_TURN: return callTurn(state, payload)
        case actionTypes.SAVE_TURN: return saveTurn(state, payload)
        case actionTypes.UPDATE_TURN: return updateTurn(state, payload)
<<<<<<< HEAD
        case actionTypes.LOAD_BACKUP_START: return loadBackupStart(state)
        case actionTypes.LOAD_BACKUP_SUCCESSED: return setPreviousState(state, payload)
        case actionTypes.LOAD_BACKUP_FAILED: return loadBackupFailed(state, payload)
=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
        default: return state
    }
}

export default reducer

