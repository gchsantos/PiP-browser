const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

function createWindow(url, file, frame) {
    if (!url && !file)
        throw Error('You need to specify the url or the file parameter');
    else if (url && file)
        throw Error('Only one parameter needs to be specified');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: frame,
        alwaysOnTop: true,
        titleBarStyle: 'customButtonsOnHover',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            isOffscreen: true
        }
    })

    url && mainWindow.loadURL(url);
    file && mainWindow.loadFile(file);
}

function reload() {
    mainWindow.reload();
}

function createShortcuts() {
    globalShortcut.register('f5', reload)
}

function pipBrowser({ url = null, file = null, frame = false }) {
    app.whenReady().then(() => {
        createWindow(url, file, frame);
        createShortcuts();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow(url, file, frame)
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}

module.exports = {
    pipBrowser
}