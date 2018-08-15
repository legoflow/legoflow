'use strict'

const electron = require('electron')

const ipc = electron.ipcMain

let mainWindow = void 0

const factory = function (key, main) {
  ipc.on(key, (event, data) => {
    const { path } = data

    const config = path.getConfig(data)

    if (!config) {
      global.__messager.event('找不到配置文件')

      return void 0
    }

    mainWindow.webContents.send('PROJECT_UPDATE', config)

    config.projectPath = config.path

    main(event, config)
  })
}

factory.setMainWindow = (_mainWindow) => {
  mainWindow = _mainWindow
}

module.exports = factory
