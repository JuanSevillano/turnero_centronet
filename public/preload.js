console.log('...preloading')
const { remote, ipcRenderer } = require('electron')
// Making ipcRenderer availablefor react context
window.ipcRenderer = require('electron').ipcRenderer;
window.remoten = remote

window.addEventListener('DOMContentLoaded', () => {



    setTimeout(() => {
        document.getElementById('minimize-button').addEventListener('click', () => {
            remote.getCurrentWindow().minimize()
        })
        document.getElementById('close-button').addEventListener('click', () => {
            remote.app.quit()
        })
    }, 500)

})

