// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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
    mainWindow.webContents.openDevTools()
    secondWindow.webContents.openDevTools()

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
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.