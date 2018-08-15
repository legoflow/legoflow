<template>
    <div class="panel">
        <div class="panel-log" :style="{ transform: isShowLogPanel ? 'translate3d( 0, -70px, 0 )' : '' }">
            <div class="log-item log-dev">
                开发:<span :class="{ 'log-url': panelLogDev.indexOf( 'http://' ) == 0 }" @click="( ) => isOpen( panelLogDev )">{{ panelLogDev }}</span>
            </div>
            <div class="log-item log-build">
                构建:<span>{{ panelLogBuild }}</span>
            </div>
        </div>
        <div class="panel-content">
            <div class="panel-content-btns">
                <button :class="[
                        project[ projectActiveIndex ] && ( project[ projectActiveIndex ].dev.launch || project[ projectActiveIndex ].dev.run ) ? 'is-running' : '',
                        project[ projectActiveIndex ] && ( project[ projectActiveIndex ].dev.launch || project[ projectActiveIndex ].dev.run ) && isMoveOnDevBtn ? 'stop-state' : '',
                    ]"
                    @click="dev"
                    @mouseleave="( ) => isMoveOnDevBtn = false"
                    @mouseenter="( ) => isMoveOnDevBtn = true"
                >
                    {{ devBtnText( ) }}
                </button>
                <button :class="[
                        project[ projectActiveIndex ] && project[ projectActiveIndex ].build ? 'is-running' : '',
                        project[ projectActiveIndex ] && project[ projectActiveIndex ].build && isMoveOnBuildBtn ? 'stop-state' : '',
                    ]"
                    @click="build"
                    @mouseleave="( ) => isMoveOnBuildBtn = false"
                    @mouseenter="( ) => isMoveOnBuildBtn = true"
                >
                    {{ buildBtnText( ) }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.panel {
    position: relative;
    width: 100%;
    height: 45px;
}

.panel-log {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 2px 10px rgba(0,144,255,.2);
    border-top: 1px solid $mainColorBorderColor;
    z-index: 3;
    background-color: #FBFBFB;
    transition: transform .2s ease;
    will-change: transform;
    .log-url {
        cursor: pointer;
        -webkit-touch-callout: none;
        user-select: none;
    }
    .log-item {
        position: relative;
        padding: 0 10px 0 10px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 11px;
        border-bottom: 1px solid $borderColor;
        color: $mainColor;
        display: flex;
        align-items: center;
        &:before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 10px;
            margin: auto;
            width: 8px;
            height: 8px;
            content: "";
            border-radius: 50%;
        }
        span {
            margin-left: 5px;
            width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            text-decoration: none;
        }
    }
}

.panel-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    box-shadow: 0 2px 10px rgba( 0, 144, 255, .2 );
    border-top: 1px solid $mainColorBorderColor;
    z-index: 9;
    background-color: #FBFBFB;
}

.panel-content-ico-box {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.panel-content-ico {
    margin-left: 10px;
    width: 20px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    &:nth-of-type( 1 ) {
        background-image: url( ../image/editor.png );
    }
    &:nth-of-type( 2 ) {
        background-image: url( ../image/folder.png );
    }
    &:nth-of-type( 3 ) {
        width: 19px;
        height: 20px;
        background-image: url( ../image/more.png );
    }
}

.panel-content-btns {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    button {
        float: left;
        width: 50%;
        height: 100%;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        font-size: 15px;
        color: $mainColor;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all .1s ease;
        &:nth-of-type( 2 ) {
            border-left: 1px solid $borderColor;
        }
    }
}

.is-running {
    background-color: $mainColor !important;
    color: $whiteColor !important;
    border-color: $mainColor !important;
}

.stop-state {
    background-color: $redColor !important;
}

</style>

<script>
export default {
    computed: Vuex.mapState( [ 'viewIndex', 'project', 'projectActiveIndex', 'panelLog' ] ),
    data ( ) {
        return {
            isAutoToggleLogPanel: true,
            isShowLogPanel: false,
            isMoveOnDevBtn: false,
            isMoveOnBuildBtn: false,
            panelLogDev: '',
            panelLogBuild: '',
        };
    },
    mounted ( ) {
        window.eventBus.$on( 'MAIN_WINDOW_BLUR', ( ) => {
            this.isMoveOnDevBtn = false;
            this.isMoveOnBuildBtn = false;
        } );
    },
    methods: {
        autoToggleShowLogPanel ( ) {
            if ( !this.isAutoToggleLogPanel ) {
                return void 0;
            }

            if ( !this.panelLogDev && !this.panelLogBuild ) {
                this.isShowLogPanel = false;
            }
            else {
                this.isShowLogPanel = true;
            }
        },
        dev: window.appUtil.debounce( 200, function ( ) {
            const project = this.project[ this.projectActiveIndex ];

            const { workflow: { dev } } = window.ipc;

            if ( !project.dev.launch && !project.dev.run ) {
                let devingProjectNumber = 0;

                this.project.forEach( ( item ) => {
                    item.dev.launch && project.dev.run && ++devingProjectNumber;
                } );

                if ( devingProjectNumber >= 5 ) {
                    alert( '最多可同时启动 5 个开发工作流项目' );
                    return void 0;
                }

                dev.run( project );
            }
            else {
                dev.stop( project );
            }
        } ),
        build: window.appUtil.debounce( 200, function ( ) {
            const project = this.project[ this.projectActiveIndex ];

            const { workflow: { build } } = window.ipc;

            !project.build ? build.run( project ) : build.stop( project );
        } ),
        devBtnText ( ) {
            if ( !this.project[ this.projectActiveIndex ] ) {
                return '开发';
            }

            const isDevLaunch = this.project[ this.projectActiveIndex ].dev.launch;
            const isDevRun = this.project[ this.projectActiveIndex ].dev.run;

            if ( !isDevLaunch && !isDevRun ) { return '开发' };
            if ( isDevLaunch && !this.isMoveOnDevBtn ) { return '启动中' };
            if ( isDevRun && !this.isMoveOnDevBtn ) { return '监听中' };
            if ( this.isMoveOnDevBtn && ( isDevLaunch || isDevRun ) ) { return '停止' };
        },
        buildBtnText ( ) {
            if ( !this.project[ this.projectActiveIndex ] ) {
                return '构建';
            }

            const isBuildRun = this.project[ this.projectActiveIndex ].build;

            if ( !isBuildRun ) { return '构建' };
            if ( isBuildRun && !this.isMoveOnBuildBtn ) { return '构建中' };
            if ( this.isMoveOnBuildBtn && isBuildRun ) { return '停止' };
        },
        setLocalPanelLog ( ) {
            const { panelLog, project, projectActiveIndex } = this;

            if ( !project[ projectActiveIndex ] ) {
                return void 0;
            }

            const log = panelLog[ project[ projectActiveIndex ].id ];

            if ( log ) {
                this.panelLogDev = log.dev;
                this.panelLogBuild = log.build;
            }
            else {
                this.panelLogDev = '';
                this.panelLogBuild = '';
            }
        },
        isOpen ( text ) {
            window.ipc.util.chromeOpen( text );
        }
    },
    watch: {
        projectActiveIndex ( v ) {
            this.setLocalPanelLog( );
            Vue.nextTick( ( ) => {
                this.autoToggleShowLogPanel( );
            } )
        },
        panelLog: {
            deep: true,
            handler ( ) {
                this.setLocalPanelLog( );
                Vue.nextTick( ( ) => {
                    this.autoToggleShowLogPanel( );
                } )
            }
        },
    },
};
</script>
