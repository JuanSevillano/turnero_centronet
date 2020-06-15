// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

const isDev = require('electron-is-dev')
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
    if (isDev) {
        mainWindow.webContents.openDevTools()
        secondWindow.webContents.openDevTools()
    }

    // Sending message to home, to make react redirect to /turner path
    secondWindow.webContents.on('dom-ready', () => {

        secondWindow.webContents.send('onLocation', { url: '/turner' })
        ipcMain.on('waiting', (event, message) => {
            secondWindow.webContents.send('waiting', message)
            return
        })

        ipcMain.on('call', (e, message) => {
            secondWindow.webContents.send('call', message)
        })

        ipcMain.on('save', (e, message) => {
            secondWindow.webContents.send('save', message)
        })

    })




    mainWindow.webContents.on('dom-ready', () => {
        //console.log('Main win ready')

        mainWindow.webContents.on('waiting', ({ number, turn }) => {
            console.log(number, turn)
        })
    })

}

// When Electron app is ready
app.whenReady().then(() => {
    // Creating the windows 
    createWindow()
    // Check for new release 

    autoUpdater.checkForUpdatesAndNotify()

    // MacOs re-create windows when logo is clicked 
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// Auto-updater check for available updates
const sendUpdateToFront = message => mainWindow.webContents.send('update', message)

if (isDev) {
    autoUpdater.logger = require('electron-log')
    autoUpdater.logger.transports.file.level = 'info'
}

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
    autoUpdater.quitAndInstall()
})

autoUpdater.on('error', info => {
    console.log('update available: ', info.releaseDate)
    //autoUpdater.quitAndInstall()
})
