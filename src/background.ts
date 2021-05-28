'use strict'

import {app, protocol, BrowserWindow, Menu, Tray, ipcMain, nativeImage} from 'electron';
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib';
import Microphone from "@/plugins/win-audio/microphone";
import AutoLaunch from "auto-launch";
import audio from "win-audio";
import path from "path";

const microphone: Microphone = audio.mic;
let trayMenu: Menu;
let tray: Tray;
let lastVolume = 100;
let closing = false;

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
]);

app.on('ready', async () => {
    setInterval(() => {
        if (lastVolume != microphone.get()) {
            microphone.set(lastVolume);
        }
    }, 250);

    ipcMain.on("volume", (event, value) => {
        microphone.set(lastVolume = value);
        event.sender.send("volume", microphone.get());
    });

    ipcMain.on("loaded", event => {
        event.sender.send("volume", microphone.get());
    });

    await new AutoLaunch({
        name: 'Fuck Auto Adjust',
        path: app.getPath('exe'),
    }).enable();

    const win = new BrowserWindow({
        frame: false,
        width: 854,
        height: 480,
        resizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    });

    win.removeMenu();

    win.on('close', function (evt) {
        if (!closing) {
            evt.preventDefault();
            win.hide();
        }
    });

    win.on('closed', () => {
        tray.destroy();
    });

    trayMenu = Menu.buildFromTemplate([
        {
            label: 'Open', click: () => win.show()
        },
        {
            label: 'Quit', click: () => closeApp()
        }
    ]);

    tray = new Tray(nativeImage.createFromPath(path.join(__static, "icon.png")));
    tray.setContextMenu(trayMenu);

    ipcMain.on("close", () => win.hide());

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        // win.webContents.openDevTools()
    } else {
        createProtocol('app');
        await win.loadURL('app://./index.html');
    }
});

function closeApp() {
    closing = true;
    app.quit();
}