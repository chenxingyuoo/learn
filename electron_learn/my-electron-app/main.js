/*
 * @Description: 文件描述
 * @Date: 2024-01-15 22:03:20
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @FilePath: /my-electron-app/main.js
 */
const { app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut, shell, Notification, Tray,nativeImage } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const https = require('node:https')
// const printer = require('printer'); // 导入打印机库
const { PosPrinter } = require('electron-pos-printer')

const options = {
  preview: false,
  margin: '0 0 0 0',
  copies: 1,
  printerName: 'RICOH_MP_C3003__002673AA923A_',
  timeOutPerLine: 10000,
  pageSize: '80mm', // page size
  silent: true
}


let tray

// 通知
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// 深度链接 (Deep Links)
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

let bluetoothPinCallback
let selectBluetoothCallback

async function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 禁止沙盒
      sandbox: false,
       //  渲染进程 开启node模块，使得JS中可以使用node的model
      // nodeIntegration:true,
      // 控制上下文隔离
      // contextIsolation:false,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)


  // 设备访问start
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    selectBluetoothCallback = callback
    const result = deviceList.find((device) => {
      console.log("======>" + device.deviceName)
      // return device.deviceName === 'xingyu的iPhone'
      return device.deviceName === '云音乐Music'
    })
    if (result) {
      callback(result.deviceId)
    } else {
      // The device wasn't found so we need to either wait longer (eg until the
      // device is turned on) or until the user cancels the request
    }
  })

  ipcMain.on('cancel-bluetooth-request', (event) => {
    selectBluetoothCallback('')
  })

  // Listen for a message from the renderer to get the response for the Bluetooth pairing.
  ipcMain.on('bluetooth-pairing-response', (event, response) => {
    bluetoothPinCallback(response)
  })

  mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback
    // Send a message to the renderer to prompt the user to confirm the pairing.
    mainWindow.webContents.send('bluetooth-pairing-request', details)
  })

  // mainWindow.webContents
  //   .executeJavaScript(`document.getElementById("clickme").click();`,true );
  // 设备访问end


  // WebUSB API start
  let grantedDeviceThroughPermHandler

  mainWindow.webContents.session.on('select-usb-device', (event, details, callback) => {
    // Add events to handle devices being added or removed before the callback on
    // `select-usb-device` is called.
    mainWindow.webContents.session.on('usb-device-added', (event, device) => {
      console.log('usb-device-added FIRED WITH', device)
      // Optionally update details.deviceList
    })

    mainWindow.webContents.session.on('usb-device-removed', (event, device) => {
      console.log('usb-device-removed FIRED WITH', device)
      // Optionally update details.deviceList
    })

    event.preventDefault()
    if (details.deviceList && details.deviceList.length > 0) {
      const deviceToReturn = details.deviceList.find((device) => {
        return !grantedDeviceThroughPermHandler || (device.deviceId !== grantedDeviceThroughPermHandler.deviceId)
      })
      if (deviceToReturn) {
        callback(deviceToReturn.deviceId)
      } else {
        callback()
      }
    }
  })

  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'usb' && details.securityOrigin === 'file:///') {
      return true
    }
  })

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === 'usb' && details.origin === 'file://') {
      if (!grantedDeviceThroughPermHandler) {
        grantedDeviceThroughPermHandler = details.device
        return true
      } else {
        return false
      }
    }
  })

  mainWindow.webContents.session.setUSBProtectedClassesHandler((details) => {
    return details.protectedClasses.filter((usbClass) => {
      // Exclude classes except for audio classes
      return usbClass.indexOf('audio') === -1
    })
  })

  mainWindow.loadFile('index.html')


  // 拦截主进程中的事件
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  const fileData = fs.readFileSync(path.join(__dirname, 'H.jpg')); 
  const buffer = Buffer.from(fileData);

//   printer.printDirect({
//     data: new Buffer(fileData),
//     type: 'RAW',
//     success: (jobID) => console.log(`Print job ${jobID} started.`),
//     error: (err) => console.error(`Error printing:`, err)
// });
 
  // 将Buffer对象转换为Base64字符串
  const base64String = 'data:image/jpg;base64,' + buffer.toString('base64');

  const data = [
    {
        type: 'image',
        url: base64String,     // file path
        position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        width: 'auto',                                           // width of image in px; default: auto
        height: 'auto',                                          // width of image in px; default: 50 or '50px'
    }
  ]

  PosPrinter.print(data, options)
  .then(() => { 
    console.log(' print success ');
   })
  .catch((error) => {
      // console.error(error);
      console.log('print error');
    });


  // 在background.js里把win对象传递进来,通过win的webContents的getPrintersAsync方法获取到本地打印机，在渲染进程进行读取
  const printersList = await mainWindow.webContents.getPrintersAsync()
  console.log('printersList', printersList);


  let printWindow = new BrowserWindow({ show: true, width: 842, height: 595, contextIsolation: false, enableRemoteModule: true, nodeIntegration: true, webSecurity: false })

  let htmlText = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      *{
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <img src="${base64String}" style="width:100%" />
  </body>
  </html>`

  printWindow.loadURL('data:text/html,' + encodeURIComponent(htmlText))
  
  printWindow.webContents.on('did-finish-load', async () => {
    printWindow.webContents.print({ deviceName: "RICOH_MP_C3003__002673AA923A_", silent: true, landscape: true })
    printWindow.close()
  })
}

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}
// 深度链接 (Deep Links) window版本
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }

    dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop().slice(0, -1)}`)
  })
}

const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
})

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(path.join(__dirname, './logo2.png'))
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  createWindow()

  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.on('set-title', handleSetTitle);

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })

  // 全局快捷键
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).then(showNotification)

// 原生文件拖 & 放
ipcMain.on('ondragstart', (event, filePath) => {
  console.log('filePath', filePath);
  event.sender.startDrag({
    // file: path.join(__dirname, filePath),
    file: filePath,
    icon: iconName
  })
})

// 深度链接 (Deep Links) Mac版本
// 处理协议 在本例中，我们选择显示一个错误提示对话框。
app.on('open-url', (event, url) => {
  dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  console.log('pageDirectory', pageDirectory);
  const pagePath = path.join('file://', pageDirectory, 'index.html')
  console.log('pagePath', pagePath);
  shell.openExternal(pagePath)
})

