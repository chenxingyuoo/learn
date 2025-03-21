/*
 * @Description: 文件描述
 * @Date: 2024-01-15 22:10:42
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @FilePath: /my-electron-app/preload.js
 */
const { contextBridge, ipcRenderer } = require('electron/renderer')
const path = require('node:path')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),

  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value),

  // 设备访问start
  cancelBluetoothRequest: () => ipcRenderer.send('cancel-bluetooth-request'),
  bluetoothPairingRequest: (callback) => ipcRenderer.on('bluetooth-pairing-request', () => callback()),
  bluetoothPairingResponse: (response) => ipcRenderer.send('bluetooth-pairing-response', response),
  // 设备访问end

  
})

contextBridge.exposeInMainWorld('shell', {
  open: () => ipcRenderer.send('shell:open')
})

contextBridge.exposeInMainWorld('electron', {
  // 原生文件拖 & 放
  startDrag: (fileName) => {
    console.log('fileName', fileName);
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})