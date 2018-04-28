'use strict';

const Menu = window.remote.Menu;

window.URL = {
    home: 'https://github.com/legoflow/legoflow',
    wiki: 'https://github.com/legoflow/legoflow/issues/12',
    changelog: 'https://github.com/legoflow/legoflow/CHANGELOG.md',
    advice: 'https://github.com/legoflow/legoflow/issues',
    download: 'https://legoflow.com',
}

let macMenu = [ {
    label: 'LegoFlow 2',
    submenu: [
            {
                label: `版本 ${ config.version }`,
            },
            {
                label: '检查更新',
                click ( ) {
                    window.ipc.app.checkUpdate( );
                },
            },
            { type: 'separator' },
            {
                label: '首选项',
                accelerator: 'CmdOrCtrl+,',
                click ( ) {
                    window.ipc.settingWindow.show( );
                },
            },
            { type: 'separator' },
            {
                label: '隐藏',
                accelerator: 'CmdOrCtrl+W',
                click ( ) {
                    window.ipc.mainWindow.hide( );
                },
            },
            {
                label: '最小化',
                accelerator: 'CmdOrCtrl+M',
                click ( ) {
                    window.ipc.mainWindow.min( );
                },
            },
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
                click ( ) {
                    window.remote.app.quit( );
                }
            },
            { type: 'separator' },
            {
                label: '重启',
                click ( ) {
                    window.ipc.app.restart( );
                }
            },
        ]
    },
    {
        label: '编辑',
        submenu: [
            { label: '选择全部', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
            { label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            {
                label: '打开',
                accelerator: 'CmdOrCtrl+O',
                click ( ) {
                },
            },
            { label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '打开调试',
                accelerator: 'Cmd+alt+i',
                click ( ) {
                    window.ipc.mainWindow.openDevTools( );
                }
            },
            { type: 'separator' },
            {
                label: '官网',
                click ( ) {
                    window.appUtil.openURL( window.URL.home );
                }
            },
            {
                label: '使用教程',
                click ( ) {
                    window.appUtil.openURL( window.URL.wiki );
                }
            },
            {
                label: '更新日志',
                click ( ) {
                    window.appUtil.openURL( window.URL.changelog );
                }
            },
            {
                label: '意见反馈',
                click ( ) {
                    window.appUtil.openURL( window.URL.advice );
                }
            },
        ]
    },
];

if ( config.system === 'mac' ) {
    let menu = Menu.buildFromTemplate( macMenu );
    Menu.setApplicationMenu( menu );
}
