'use strict';

const Menu = window.remote.Menu;

// 快捷键
// window.keymapAction = { };

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
                role: 'hide',
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
                    remote.app.quit( );
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
                    return false;
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
                    return false;
                }
            },
            { type: 'separator' },
            {
                label: '官网',
                click ( ) {
                    window.appUtil.openURL( 'https://github.com/legoflow/legoflow/tree/2.x' );
                    return false;
                }
            },
            {
                label: '使用教程',
                click ( ) {
                    window.appUtil.openURL( 'https://github.com/legoflow/legoflow/issues/12' );
                    return false;
                }
            },
            {
                label: '更新日志',
                click ( ) {
                    window.appUtil.openURL( 'https://github.com/legoflow/legoflow/blob/2.x/CHANGELOG.md' );
                    return false;
                }
            },
            {
                label: '意见反馈',
                click ( ) {
                    window.appUtil.openURL( 'https://github.com/legoflow/legoflow/issues' );
                    return false;
                }
            },
        ]
    },
];

if ( config.system === 'mac' ) {
    let menu = Menu.buildFromTemplate( macMenu );
    Menu.setApplicationMenu( menu );
}
