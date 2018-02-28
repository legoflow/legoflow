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
    project: window.appSetting.get( 'project' ),
    projectActiveIndex: 0,
    log: [ ],
    isShowUpdateComponent: false,
};
