<<<<<<< HEAD
import * as actionTypes from './actionTypes'
const ipc = window.ipcRenderer

=======
import * as actionTypes from './actionTypes';
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

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

<<<<<<< HEAD
export const updateTurns = prevState => ({
    type: actionTypes.UPDATE_TURNS,
    payload: prevState
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
        // storage.getAll(function (error, data) {
        //     if (error) throw error;
        //     console.log('myData', data);
        //     dispatch(loadBackupSuccessed(data))
        // })
        ipc.on('backup_loaded', (e, data) => {

            dispatch(loadBackupSuccessed(data))


        })
    }
}

=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

