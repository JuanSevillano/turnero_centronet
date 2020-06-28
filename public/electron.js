// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const dataLocation = path.resolve('./src/store/persistence.json')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const isDev = require('electron-is-dev')
const { autoUpdater } = require('electron-updater')
autoUpdater.autoDownload = true



// Auto-updater check for available updates
const sendUpdateToFront = message => mainWindow.webContents.send('update', message)


if (isDev) {
    autoUpdater.logger = require('electron-log')
    autoUpdater.logger.transports.file.level = 'info'
}

let mainWindow, secondWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 300,
        height: 350,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    secondWindow = new BrowserWindow({
        width: 1080,
        height: 720,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    // and load the index.html of the app.
    const localUrl = 'http://localhost:3000/'
    mainWindow.loadURL(
        isDev ? localUrl : `file://${path.join(__dirname, '../build/index.html')}`
    )

    secondWindow.loadURL(
        isDev ? localUrl : `file://${path.join(__dirname, '../build/index.html')}`
    )

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    // secondWindow.webContents.openDevTools()

    // Sending message to home, to make react redirect to /turner path
    secondWindow.webContents.on('dom-ready', () => {

        secondWindow.webContents.send('onLocation', { url: '/turner' })
        ipcCommunication()

    })

    mainWindow.webContents.on('dom-ready', () => {
        autoUpdater.checkForUpdatesAndNotify()
        sendUpdateToFront('checking updates...')

        mainWindow.webContents.on('waiting', ({ number, turn }) => {
            console.log(number, turn)
        })
    })

}

// This method is executed when the second screen's DOM element are loaded
const ipcCommunication = () => {
    ipcMain.on('waiting', (event, message) => {
        secondWindow.webContents.send('waiting', message)
        return
    })

    ipcMain.on('call', (e, message) => {
        secondWindow.webContents.send('call', message)
        return
    })

    ipcMain.on('save', (e, message) => {
        secondWindow.webContents.send('save', message)
        return
    })

    ipcMain.on('backup', (e, message) => {
        readFile(dataLocation, 'utf-8')
            .then(file => {
                const prevState = JSON.parse(file)

                const delivering = prevState.turns
                    .map((t, i) => ({ ...t, number: i }))
                    .filter(t => t.status === 'ORDER_DELIVERING')

                const waitingOnes = prevState.turns
                    .map((t, i) => ({ ...t, number: i }))
                    .filter(t => t.status === 'ORDER_WAITING')

                let max = 0
                for (let turn of waitingOnes) {
                    const number = turn.number
                    max = number > max ? number : max
                }

                secondWindow.webContents.send('backup_delivering', delivering)
                mainWindow.webContents.send('backup_current', max)

            }).catch(err => new Error(err))

        return
    })

    ipcMain.on('backup_save', (e, message) => {
        writeFile(dataLocation, JSON.stringify(message))
            .then(file => null)
            .catch(err => new Error(err))
        return
    })
}

// When Electron app is ready
app.whenReady().then(() => {
    // Creating the windows 
    createWindow()
    // Check for new release

    // MacOs re-create windows when logo is clicked 
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


// Autp-updater
autoUpdater.on('checking-for-update', () => {
    sendUpdateToFront('checking')
})

autoUpdater.on('udpate-available', info => {
    sendUpdateToFront(info)
})

autoUpdater.on('download-progress', progress => {
    console.log('Download progress: ', progress.percent)
    sendUpdateToFront(progress)
})

autoUpdater.on('udpate-downloaded', info => {
    console.log('updated downloaded: ', info)
    sendUpdateToFront(info)
    autoUpdater.quitAndInstall(true, true)
})

autoUpdater.on('error', info => {
    console.log('update available: ', info.releaseDate)
    sendUpdateToFront(info)
    //autoUpdater.quitAndInstall()
})
