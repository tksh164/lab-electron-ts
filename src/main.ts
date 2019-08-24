import { app, BrowserWindow } from 'electron';
import * as path from 'path';

class App {
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;

    // Keep on the reference of the main window object.
    static mainWindow: Electron.BrowserWindow | null;

    static init (app: Electron.App, browserWindow: typeof BrowserWindow) {
        App.application = app;
        App.BrowserWindow = browserWindow;

        App.application.on('window-all-closed', App.onWindowAllClosed);
        App.application.on('activate', App.onActivate);
        App.application.on('ready', App.onReady);
    }

    private static createWindow() {
        // Create the browser window.
        App.mainWindow = new App.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        // and load the index.html of the app.
        App.mainWindow.loadFile(path.join(__dirname, '../index.html'));
    
        // Open the DevTools.
        //Main.mainWindow.webContents.openDevTools();
    
        // Emitted when the window is closed.
        App.mainWindow.on('closed', App.onClosed);
    }

    private static onReady() {
        App.createWindow();
    }

    private static onClosed() {
        // Dereference the main window object.
        App.mainWindow = null;
    }

    private static onWindowAllClosed () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd+Q
        if (process.platform !== 'darwin') {
            App.application.quit();
        }
    }

    private static onActivate() {
        if (App.mainWindow === null) {
            App.createWindow();
        }
    }
}

App.init(app, BrowserWindow);
