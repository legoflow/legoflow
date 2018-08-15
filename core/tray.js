'use strict'

const path = require('path')

const { Tray } = require('electron')

let tray = void 0

module.exports = (mainWindow) => {
  const { system } = __config

  if (system !== 'mac') {
    return void 0
  }

  const trayIcon = path.resolve(__dirname, '../icon/logo-tray.png')

  tray = new Tray(trayIcon)

  tray.setToolTip('LegoFlow 2')

  tray.on('click', () => {
    mainWindow.show()
  })

  tray.on('drop-files', async (event, _path_) => {
    const projectPath = _path_[ 0 ]

    mainWindow.show()

    const result = await require('./common/project_add')({ path: projectPath })

    typeof result !== 'string' ? mainWindow.webContents.send('PROJECT_ADD_SUCCESS', result) : __messager.event(result)

    event.preventDefault()
  })
}
