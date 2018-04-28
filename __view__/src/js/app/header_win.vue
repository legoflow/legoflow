<template>
    <header>
        <div class="header-panel">
            <div class="header-panel-item">
                <span @click="panelAction( 0 )">应用</span>
                <ul style="left:5px" v-show="isShowAppMenu" ref="appMenu">
                    <li class="disable-hover">v{{ version }}</li>
                    <li @click="menuAction( 'update' )">检查更新</li>
                    <li @click="menuAction( 'setting' )">全局设置</li>
                    <li @click="menuAction( 'hide' )">隐藏</li>
                    <li @click="menuAction( 'min' )">最小化</li>
                    <li @click="menuAction( 'quit' )">退出</li>
                    <li @click="menuAction( 'restart' )">重启</li>
                </ul>
            </div>
            <div class="header-panel-item">
                <span @click="panelAction( 1 )">新建</span>
            </div>
            <div class="header-panel-item">
                <span @click="panelAction( 2 )">列表</span>
            </div>
            <div class="header-panel-item">
                <span @click="panelAction( 3 )">日志</span>
            </div>
            <div class="header-panel-item">
                <span @click="panelAction( 4 )">帮助</span>
                <ul style="left:165px" v-show="isShowHelpMenu" ref="helpMenu">
                    <li @click="menuAction( 'home' )">官网</li>
                    <li @click="menuAction( 'wiki' )">使用教程</li>
                    <li @click="menuAction( 'changelog' )">更新日志</li>
                    <li @click="menuAction( 'advice' )">意见反馈</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #f3f3f3;
    border-bottom: 1px solid #EEE;
}

.header-panel {
    padding: 0 5px;
    width: 100%;
    height: 100%;
    .header-panel-item {
        display: inline-block;
        font-size: 12px;
        -webkit-touch-callout: none;
        user-select: none;
        cursor: pointer;
        &:hover {
            background-color: rgba( 0, 0, 0, .03 );
        }
        span {
            padding: 0 5px;
            display: inline-block;
        }
        ul {
            position: absolute;
            top: 30px;
            left: 0px;
            overflow: hidden;
            background-color: #f3f3f3;
            z-index: 9;
            li {
                padding: 0 15px 0 10px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 11px;
                border-bottom: 1px solid #fefefe;
                -webkit-touch-callout: none;
                user-select: none;
                &:last-of-type {
                    border-bottom: none;
                }
                &:hover {
                    background-color: rgba( 0, 0, 0, .03 );
                }
            }
        }
    }
}

.disable-hover {
    &:hover {
        background-color: initial !important;
    }
}
</style>

<script>
export default {
    data ( ) {
        return {
            version: '',
            isShowAppMenu: false,
            isShowHelpMenu: false,
        };
    },
    mounted ( ) {
        this.$refs.appMenu.addEventListener( 'mouseleave', ( e ) => {
            this.isShowAppMenu = false;
        } );

        this.$refs.helpMenu.addEventListener( 'mouseleave', ( e ) => {
            this.isShowHelpMenu = false;
        } );

        this.version = window.config.version;
    },
    methods: {
        panelAction ( index ) {
            switch ( index ) {
                case 0: {
                    this.isShowAppMenu = true;
                    break;
                }
                case 1: {
                    this.$store.commit( 'SET_VIEW_INDEX', 0 );
                    break;
                }
                case 2: {
                    this.$store.commit( 'SET_VIEW_INDEX', 1 );
                    break;
                }
                case 3: {
                    this.$store.commit( 'SET_VIEW_INDEX', 2 );
                    break;
                }
                case 4: {
                    this.isShowHelpMenu = true;
                    break;
                }
            }
        },
        menuAction ( flag ) {
            this.isShowAppMenu = false;
            this.isShowHelpMenu = false;

            switch ( flag ) {
                case 'update': {
                    window.ipc.app.checkUpdate( );
                    break;
                }
                case 'setting': {
                    window.ipc.settingWindow.show( );
                    break;
                }
                case 'hide': {
                    window.ipc.mainWindow.hide( );
                    break;
                }
                case 'min': {
                    window.ipc.mainWindow.min( );
                    break;
                }
                case 'quit': {
                    window.remote.app.quit( );
                    break;
                }
                case 'restart': {
                    window.ipc.app.restart( );
                    break;
                }
                case 'home': {
                    window.appUtil.openURL( window.URL.home );
                    break;
                }
                case 'wiki': {
                    window.appUtil.openURL( window.URL.wiki );
                    break;
                }
                case 'changelog': {
                    window.appUtil.openURL( window.URL.changelog );
                    break;
                }
                case 'advice': {
                    window.appUtil.openURL( window.URL.advice );
                    break;
                }
            }
        },
    },
    watch: {
        isShowAppMenu ( v ) {
            v ? this.isShowHelpMenu = false : void 0;
        },
        isShowHelpMenu ( v ) {
            v ? this.isShowAppMenu = false : void 0;
        },
    },
};
</script>

