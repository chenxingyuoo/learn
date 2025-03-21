/*
 * @Description: 文件描述
 * @Date: 2024-01-16 10:31:28
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @FilePath: /my-electron-app/renderer.js
 */
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})

const fileBtn = document.getElementById('file-btn')
const filePathElement = document.getElementById('filePath')

fileBtn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.electronAPI.counterValue(newValue)
})


// 蓝牙连接
async function testIt () {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  console.log('device', device);
  document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
}

document.getElementById('clickme').addEventListener('click', testIt)

function cancelRequest () {
  window.electronAPI.cancelBluetoothRequest()
}

document.getElementById('cancel').addEventListener('click', cancelRequest)

window.electronAPI.bluetoothPairingRequest((event, details) => {
  const response = {}

  switch (details.pairingKind) {
    case 'confirm': {
      response.confirmed = window.confirm(`Do you want to connect to device ${details.deviceId}?`)
      break
    }
    case 'confirmPin': {
      response.confirmed = window.confirm(`Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`)
      break
    }
    case 'providePin': {
      const pin = window.prompt(`Please provide a pin for ${details.deviceId}.`)
      if (pin) {
        response.pin = pin
        response.confirmed = true
      } else {
        response.confirmed = false
      }
    }
  }

  window.electronAPI.bluetoothPairingResponse(response)
})

// usb连接
function getDeviceDetails (device) {
  return device.productName || `Unknown device ${device.deviceId}`
}

async function testIt () {
  const noDevicesFoundMsg = 'No devices found'
  const grantedDevices = await navigator.usb.getDevices()
  let grantedDeviceList = ''
  if (grantedDevices.length > 0) {
    for (const device of grantedDevices) {
      grantedDeviceList += `<hr>${getDeviceDetails(device)}</hr>`
    }
  } else {
    grantedDeviceList = noDevicesFoundMsg
  }
  document.getElementById('granted-devices').innerHTML = grantedDeviceList

  grantedDeviceList = ''
  try {
    const grantedDevice = await navigator.usb.requestDevice({
      filters: []
    })
    grantedDeviceList += `<hr>${getDeviceDetails(grantedDevice)}</hr>`
  } catch (ex) {
    if (ex.name === 'NotFoundError') {
      grantedDeviceList = noDevicesFoundMsg
    }
  }
  document.getElementById('granted-devices2').innerHTML = grantedDeviceList
}

document.getElementById('clickme2').addEventListener('click', testIt)

// 浏览器键盘
function handleKeyPress (event) {
  // You can put code here to handle the keypress.
  document.getElementById('last-keypress').innerText = event.key
  console.log(`You pressed ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)

// 深度链接 (Deep Links) 
// Binds the buttons to the context bridge API.
document.getElementById('open-in-browser').addEventListener('click', () => {
  window.shell.open()
})

 // 原生文件拖 & 放
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop.md')
}


// 通知
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }