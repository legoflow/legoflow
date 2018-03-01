<template>
    <div class="panel">
        <div class="panel-log" :style="{ transform: isShowLogPanel ? 'translate3d( 0, -70px, 0 )' : void 0 }">
            <div class="log-item log-dev">
                开发:<span>http://legoflow.com</span>
            </div>
            <div class="log-item log-build">
                构建:<span>完成</span>
            </div>
        </div>
        <div class="panel-content">
            <div class="panel-content-ico-box">
                <div class="panel-content-ico"></div>
                <div class="panel-content-ico"></div>
                <div class="panel-content-ico" @click="toggleShowLogPanel" @dblclick="autoShowLogPanel"></div>
            </div>
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
    width: 180px;
    height: 100%;
    button {
        float: left;
        width: 50%;
        height: 100%;
        border: none;
        border-left: 1px solid $borderColor;
        background-color: rgba(0, 0, 0, 0);
        font-size: 15px;
        color: $mainColor;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all .1s ease;
    }
}

.is-running {
    background-color: $mainColor !important;
    color: $whiteColor !important;
}

.stop-state {
    background-color: $redColor !important;
}

</style>

<script>
export default {
    computed: Vuex.mapState( [ 'viewIndex', 'project', 'projectActiveIndex' ] ),
    data ( ) {
        return {
            isAutoToggleLogPanel: true,
            isShowLogPanel: false,
            isMoveOnDevBtn: false,
            isMoveOnBuildBtn: false,
        };
    },
    methods: {
        toggleShowLogPanel ( ) {
            this.isShowLogPanel = !this.isShowLogPanel;
            this.isAutoToggleLogPanel = false;
        },
        autoShowLogPanel ( ) {
            this.isAutoToggleLogPanel = true;

            const { project, projectActiveIndex } = this;

            if ( project[ projectActiveIndex ].dev || project[ projectActiveIndex ].build ) {
                this.isShowLogPanel = true;
            }
            else {
                this.isShowLogPanel = false;
            }
        },
        dev ( ) {
            const project = this.project[ this.projectActiveIndex ];

            const { workflow: { dev } } = window.ipc;

            if ( !project.dev.launch && !project.dev.run ) {
                let devingProjectNumber = 0;

                this.project.forEach( ( item ) => {
                    item.dev.launch && project.dev.run ? ++devingProjectNumber : void 0;
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
        },
        build ( ) {
            const project = this.project[ this.projectActiveIndex ];

            const { workflow: { build } } = window.ipc;

            !project.build ? build.run( project ) : build.stop( project );
        },
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
            if ( isBuildRun && !this.isMoveOnDevBtn ) { return '构建中' };
            if ( this.isMoveOnDevBtn && isBuildRun ) { return '停止' };
        },
    },
    watch: {
        projectActiveIndex ( v ) {
            if ( !this.isAutoToggleLogPanel ) {
                return void 0;
            }

            this.autoShowLogPanel( );
        }
    },
};
</script>
