import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
const ipc = window.ipcRenderer

const initialTurns = new Array(999).fill().map(t => ({ status: actionTypes.ORDER_FREE }))
const initialState = {
    turns: initialTurns,
    currentTurn: null,
    loading: false,
    error: null,
    soundOn: true,
    voiceOn: false,
    displays: []
}

const sendMessage = (channel, message) => {
    if (channel !== null && message !== null) {
        ipc.send(channel, message)
    }
}

const savePersistance = state => sendMessage('backup_save', state)

const generateTurn = (state, payload) => {
    const number = state.turns.findIndex((t, i) => i !== 0 ? t.status === actionTypes.ORDER_FREE : null)
    const updated = [...state.turns]
    updated[number].status = actionTypes.ORDER_WAITING
    sendMessage('waiting', { number: number, turn: updated[number] })
    const newOne = updateObject(state, {
        turns: updated,
        currentTurn: +number
    })
    savePersistance(newOne)
    return newOne
}

const callTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number && t.status === actionTypes.ORDER_WAITING)
    if (turn) {
        turn.status = actionTypes.ORDER_DELIVERING
        const updatedTurns = [...state.turns]
        updatedTurns[number] = turn
        sendMessage('call', { number: number, turn: updatedTurns[number] })
        const newOne = updateObject(state, {
            turns: updatedTurns,
            currentTurn: +number
        })
        savePersistance(newOne)
        return newOne
    } else {
        return state
    }
}

const saveTurn = (state, number) => {
    const turn = state.turns.find((t, i) => i === +number)
    turn.status = actionTypes.ORDER_DELIVERED
    const updatedTurns = [...state.turns]
    updatedTurns[number] = turn
    sendMessage('save', { number: number, turn: updatedTurns[number] })
    const newCurrent = +number
    const newOne = updateObject(state, {
        turns: updatedTurns
    })
    savePersistance(newOne)
    return newOne
}

const updateTurn = (state, message) => {
    const turn = message.number.turn
    const updatedTurns = [...state.turns]
    updatedTurns[message.number.number] = turn
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
    const newState = { ...prevState, backup: true }
    return updateObject(state, newState)
}

const loadBackupFailed = (state, err) => {
    return updateObject(state, { error: err })
}

const updateTurns = (state, someTurns) => {
    const updatedTurns = [...state.turns]

    for (let turn of someTurns) {
        updatedTurns[turn.number].status = turn.status
    }

    return updateObject(state, {
        turns: updatedTurns
    })
}

const updateCurrent = (state, newCurrent) => {
    return updateObject(state, { currentTurn: newCurrent })
}

const toggleAudio = (state, bool) => {
    return updateObject(state, { soundOn: bool })
}

const toggleVoice = (state, bool) => {
    return updateObject(state, { voiceOn: bool })
}

const setInitial = (state, number) => {
    const updatedTurns = [...state.turns].map((t, i) => {
        if (i <= number) {
            return { ...t, status: actionTypes.ORDER_WAITING }
        } else {
            return t
        }
    })

    return updateObject(state, {
        currentTurn: number,
        turns: updatedTurns
    })
}

const saveDisplays = (state, displays) => {
    return updateObject(state, { displays: displays })
}

const setSecondWindowDisplay = (state, displayId) => {
    sendMessage('setSecondWindowDisplay', displayId)
    return state
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GENERATE_TURN: return generateTurn(state, payload)
        case actionTypes.UPDATE_CURRENT: return updateCurrent(state, payload)
        case actionTypes.CALL_TURN: return callTurn(state, payload)
        case actionTypes.SAVE_TURN: return saveTurn(state, payload)
        case actionTypes.UPDATE_TURN: return updateTurn(state, payload)
        case actionTypes.UPDATE_TURNS: return updateTurns(state, payload)
        case actionTypes.LOAD_BACKUP_START: return loadBackupStart(state)
        case actionTypes.LOAD_BACKUP_SUCCESSED: return setPreviousState(state, payload)
        case actionTypes.LOAD_BACKUP_FAILED: return loadBackupFailed(state, payload)
        case actionTypes.TOGGLE_AUDIO: return toggleAudio(state, payload)
        case actionTypes.TOGGLE_VOICE: return toggleVoice(state, payload)
        case actionTypes.SET_INITIAL: return setInitial(state, payload)
        case actionTypes.SAVE_DISPLAYS: return saveDisplays(state, payload)
        case actionTypes.SET_SECOND_WINDOW_DISPLAY: return setSecondWindowDisplay(state, payload)
        default: return state
    }
}

export default reducer

