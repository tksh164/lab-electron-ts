import { BrowserWindow } from 'electron';
import * as path from 'path';

export default class Main {
    // Keep on the reference of the main window object.
    static mainWindow: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;

    static main (app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('activate', Main.onActivate);
        Main.application.on('ready', Main.onReady);
    }

    private static createWindow() {
        // Create the browser window.
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        // and load the index.html of the app.
        Main.mainWindow.loadFile(path.join(__dirname, '../index.html'));
    
        // Open the DevTools.
        Main.mainWindow.webContents.openDevTools();
    
        // Emitted when the window is closed.
        Main.mainWindow.on('closed', Main.onClosed);
    }

    private static onReady() {
        Main.createWindow();
    }

    private static onClosed() {
        // Dereference the main window object.
        Main.mainWindow = null;
    }

    private static onWindowAllClosed () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd+Q
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onActivate() {
        if (Main.mainWindow === null) {
            Main.createWindow();
        }
    }
}
