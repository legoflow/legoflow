'use strict';

export default {
    user: window.appSetting.get( 'user' ),
    port: window.appSetting.get( 'port' ),
    editor: window.appSetting.get( 'editor' ),
    autoOpenChrome: window.appSetting.get( 'autoOpenChrome' ),
    view: [
        { label: '新建', component: 'NewComponent' },
        { label: '列表', component: 'ListComponent' },
        { label: '日志', component: 'LogComponent' },
    ],
    viewIndex: 1,
    project: [
        { id: '1', name: '项目1', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '2', name: '项目2', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '3', name: '项目3', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '4', name: '项目4', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '5', name: '项目5', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '6', name: '项目6', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '7', name: '项目7', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '8', name: '项目8', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '9', name: '项目9', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
        { id: '10', name: '项目10', path: '/asdasd', dev: false, build: false, version: '0.0.1' },
    ],
    projectActiveIndex: 0,
    log: [ ],
    isShowUpdateComponent: false,
};
