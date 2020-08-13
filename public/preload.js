console.log('...preloading app enviroment')

const { remote, ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer
window.remoten = remote
// window.addEventListener('DOMContentLoaded', () => {})

