import * as actionTypes from './actionTypes'
const ipc = window.ipcRenderer


export const generateTurn = () => ({
    type: actionTypes.GENERATE_TURN
})

export const updateCurrent = number => ({
    type: actionTypes.UPDATE_CURRENT,
    payload: number
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

export const updateTurns = someTurns => ({
    type: actionTypes.UPDATE_TURNS,
    payload: someTurns
})

export const loadBackupStart = () => ({
    type: actionTypes.LOAD_BACKUP_START
})

export const loadBackupSuccessed = prevState => ({
    type: actionTypes.LOAD_BACKUP_SUCCESSED,
    payload: prevState
})

export const loadBackupFailed = err => ({
    type: actionTypes.LOAD_BACKUP_FAILED,
    payload: err
})

export const loadBackup = () => {
    return dispatch => {
        dispatch(loadBackupStart())
        ipc.on('backup_loaded', (e, data) => {
            console.log(data)
            dispatch(loadBackupSuccessed(data))
        })
    }
}


export const toggleAudio = bool => ({
    type: actionTypes.TOGGLE_AUDIO,
    payload: bool
})

export const toggleVoice = bool => ({
    type: actionTypes.TOGGLE_AUDIO,
    payload: bool
})


export const setInitial = number => ({
    type: actionTypes.SET_INITIAL,
    payload: number
})