function reload(window) {
    window.reload();
}

function goBack(window) {
    window.webContents.goBack();
}

function goForward(window) {
    window.webContents.goForward();
}

module.exports = {
    reload,
    goBack,
    goForward
}