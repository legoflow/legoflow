'use strict'

const webSetting = require('../common/web_setting')
const threadKiller = require('../common/thread_killer')
const updater = require('../common/updater')

let app, mainWindow, settingWindow

module.exports = (_app, _mainWindow, _settingWindow) => {
  /* eslint-disable no-unused-expressions */
  /* eslint-disable no-sequences */
  app = _app, mainWindow = _mainWindow; settingWindow = _settingWindow
}

const electron = require('electron')
const fs = require('fs-extra')

const { exec } = require('child_process')

const ipc = electron.ipcMain

// 应用重启
ipc.on('APP_RESTART', (event) => {
  threadKiller()

  app.relaunch()
  app.exit(0)
})

// 停止全部工作流进程
ipc.on('THREAD_KILL', (event) => {
  threadKiller()
})

// 最小化应用窗口
ipc.on('MAIN_WINDOW_MIN', () => mainWindow.minimize())

// 显示应用窗口
ipc.on('MAIN_WINDOW_SHOW', () => mainWindow.show())

// 隐藏应用窗口
ipc.on('MAIN_WINDOW_HIDE', () => mainWindow.hide())

// 隐藏设置窗口
ipc.on('SETTING_WINDOW_HIDE', () => settingWindow.hide())

// 显示设置窗口
ipc.on('SETTING_WINDOW_SHOW', () => settingWindow.show())

// 更新配置
ipc.on('UPDATE_CONFIG', async (event, config) => {
  for (let i in config) {
    webSetting.update(i, config[ i ])
  }
})

// 使用 chrome 打开
ipc.on('UTIL_CHROME_OPEN', (event, url) => {
  __util.chromeOpen(url)
})

// 使用 资源管理器打开
ipc.on('UTIL_FOLDER_OPEN', (event, url) => {
  if (!fs.existsSync(url)) {
    __messager.event('无法打开不存在的路径')

    return void 0
  }

  electron.shell.showItemInFolder(url)
})

ipc.on('UTIL_EDITOR_OPEN', (event, url) => {
  let { editor } = __config

  if (editor && fs.existsSync(url)) {
    switch (editor) {
      case 'sublimeText3':
        editor = 'Sublime Text'
        break
      case 'VSCode':
        editor = 'Visual Studio Code'
        break
      case 'Atom':
        editor = 'atom'
        break
      case 'WebStorm':
        editor = 'webStorm'
        break
    }

    const command = `open -a "${editor}"  ${url}`

    exec(command, (e) => {
      if (e) {
        __messager.event('无法打开编辑器')
      }
    })
  }
})

ipc.on('APP_CHECK_UPDATE', async (event, isAuto = false) => {
  const { version, isNeedUpdate } = await updater.check()

  console.log('[check update result]', version)

  if (isNeedUpdate) {
    mainWindow.webContents.send('CAN_UPDATE', { version })
  } else {
    if (!isAuto) {
      __messager.event(`当前版本为最新${__config.lab ? '预览' : '正式'}版本`)
    }
  }
})

ipc.on('APP_UPDATE', async (event) => {
  const tips = [
    '下载更新包...',
    '解压中...'
  ]

  let step = 0

  updater.updating((msg, progress) => {
    mainWindow.webContents.send('UPDATE', { type: 'ing', msg: tips[ step ] || '保存中...' })

    ++step
  })

  updater.update().then(() => {
    mainWindow.webContents.send('UPDATE', { type: 'success' })
  }).catch((e) => {
    mainWindow.webContents.send('UPDATE', { type: 'fail', msg: `更新失败: ${e}` })
  })
})

ipc.on('MAIN_WINDOW_OPEN_DEV_TOOLS', (event) => {
  mainWindow.webContents.openDevTools({ mode: 'undocked' })
})
