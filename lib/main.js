const { app, BrowserWindow, globalShortcut } = require('electron');
const { goBack, goForward, reload } = require('./shortcutFunctions')

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

function createShortcuts() {
    globalShortcut.register('f5', () => { return reload(mainWindow); });
    globalShortcut.registerAll(['Alt+Left'], () => { return goBack(mainWindow); });
    globalShortcut.registerAll(['Shift+Backspace', 'Alt+Right'], () => { return goForward(mainWindow); });
}

function pipBrowser({ url = null, file = null, frame = false }) {
    app.whenReady().then(() => {
        createWindow(url, file, frame);
        createShortcuts();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow(url, file, frame)
        })

        mainWindow.webContents.setZoomFactor(1.0);
        mainWindow.webContents.setVisualZoomLevelLimits(1, 5);

        mainWindow.webContents.on("zoom-changed", (event, zoomDirection) => {
            try {
                var currentZoom = mainWindow.webContents.getZoomFactor();
                if (zoomDirection === "in")
                    mainWindow.webContents.zoomFactor = currentZoom + 0.2;
                else if (zoomDirection === "out")
                    mainWindow.webContents.zoomFactor = currentZoom - 0.2;
            } catch {
                return
            }
        });

        //Get input events
        // mainWindow.webContents.on("before-input-event", (event, input) => {
        //     console.log(input);
        // });

    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}

module.exports = {
    pipBrowser
}