console.log('...preloading')
const { remote, ipcRenderer } = require('electron')
// Making ipcRenderer availablefor react context
window.ipcRenderer = require('electron').ipcRenderer;
window.webContents = require('electron').webContents

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('minimize-button').addEventListener('click', () => {
        remote.getCurrentWindow().minimize()
    })

    // document.getElementById('min-max-button').addEventListener('click', () => {
    //     const currentWindow = remote.getCurrentWindow()
    //     if (currentWindow.isMaximized()) {
    //         currentWindow.unmaximize()
    //     } else {
    //         currentWindow.maximize()
    //     }
    // })

    document.getElementById('close-button').addEventListener('click', () => {
        remote.app.quit()
    })

})

