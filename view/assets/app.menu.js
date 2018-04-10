'use strict';

const Menu = window.remote.Menu;

// 快捷键
// window.keymapAction = { };

// const user = window.localStorage.legoflow_user;

let macMenu = [ {
    label: 'LegoFlow',
    submenu: [
            {
                label: `版本 ${ config.version }`,
            },
            {
                label: '检查更新',
                click ( ) {
                    // window.versionCheck( true );
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
                label: 'user node_modules',
                click ( ) {
                    window.ipc.openRootPath( './node_modules_user' );
                },
            },
            { type: 'separator' },
            {
                label: '清空端口线程',
                click ( ) {
                    alert( {
                        msg: '是否确定删除所有端口线程',
                        btns: [ '否', '是' ],
                        callback ( index ) {
                            if ( index === 1 ) {
                                window.ipc.cleanPortFork( );
                            }
                        }
                    } );
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
                label: '官网',
                click ( ) {
                    window.shell.openExternal( 'https://legoflow.com/' );
                    return false;
                }
            },
            {
                label: '使用教程',
                click ( ) {
                    window.shell.openExternal( 'https://github.com/legoflow/legoflow/wiki' );
                    return false;
                }
            },
            {
                label: '更新日志',
                click ( ) {
                    window.shell.openExternal( 'https://legoflow.com/changelog' );
                    return false;
                }
            },
            {
                label: '意见反馈',
                click ( ) {
                    window.shell.openExternal( 'https://github.com/legoflow/legoflow/issues' );
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

// 一天检测一次版本更新
// setInterval(() => {
//     window.versionCheck( false );
// }, 1000 * 60 * 60 * 24 )
