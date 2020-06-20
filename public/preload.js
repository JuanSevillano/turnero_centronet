<<<<<<< HEAD
console.log('...preloading app enviroment')

const { remote, ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer
window.remoten = remote
// window.addEventListener('DOMContentLoaded', () => {})
=======
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
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

