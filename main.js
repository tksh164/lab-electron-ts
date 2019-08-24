const { app, BrowserWindow } = require('electron')

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is read to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
