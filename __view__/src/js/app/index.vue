<template>
    <div id="app">
        <component :is="headerComponent"></component>
        <div class="view" :style="{ transform: `translate3d( ${ `${ viewIndex * -100 }%` }, 0, 0 )` }" :class="[ system !== 'mac' ? 'win-view' : '' ]">
            <component
                v-for="( item, $index ) in view"
                :key="$index"
                :is="item.component"
                :style="{ left: 100 * $index + '%' }"
            >
            </component>
        </div>
        <update-component></update-component>
    </div>
</template>

<style lang="scss">
@import "~var";

#app {
    width: 280px;
    height: 100%;
    transform: translate( 0, 0 );
}

.view {
    position: relative;
    width: 100%;
    height: calc( 100% - 45px );
    transition: all .2s ease;
}

.win-view {
    height: calc( 100% - 30px );
}

.view-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

<script>
import HeaderMacComponent from './header_mac';
import HeaderWinComponent from './header_win';
import NewComponent from './new';
import ListComponent from './list';
import LogComponent from './log';
import UpdateComponent from './update';

export default {
    computed: Vuex.mapState( [ 'view', 'viewIndex', 'project' ] ),
    components: {
        HeaderMacComponent,
        HeaderWinComponent,
        NewComponent,
        ListComponent,
        LogComponent,
        UpdateComponent,
    },
    created ( ) {
        window.vm = this;
        window.eventBus = new Vue( );
    },
    data ( ) {
        return {
            headerComponent: window.config.system == 'mac' ? 'HeaderMacComponent' : 'HeaderWinComponent',
            system: window.config.system,
        }
    },
    mounted ( ) {
        let isShowApp = false;

        window.onload = ( ) => {
            isShowApp = true;

            window.ipc.mainWindow.show( );

            setTimeout( ( ) => {
                window.ipc.app.checkUpdate( true );
            }, 500 );
        }

        setTimeout( ( ) => {
            !isShowApp ? window.ipc.mainWindow.show( ) : void 0;
        }, 1000 );

        Mousetrap.bind( 'left', ( ) => {
            if ( this.viewIndex > 0 ) {
                this.$store.commit( 'SET_VIEW_INDEX', this.viewIndex - 1 );
            }

            return false;
        } );

        Mousetrap.bind( 'right', ( ) => {
            if ( this.viewIndex < this.view.length - 1 ) {
                this.$store.commit( 'SET_VIEW_INDEX', this.viewIndex + 1 );
            }

            return false;
        } );
    },
    methods: {
        async updateAlert ( { version } ) {
            alert( {
                msg: `是否更新版本 ${ version }`,
                list: [ { label: '查看新版本功能', url: window.url.changelog } ],
                btns: [ '取消', '确定更新' ],
                callback: ( index ) => {
                    if ( index == 1 ) {
                        window.ipc.app.update( );
                    }
                },
            } )
        },
        update ( { type, msg } ) {
            switch ( type ) {
                case 'ing': {
                    this.$store.commit( 'SET_UPDATE_COMPONENT_LABEL', msg );

                    this.$store.commit( 'SHOW_UPDATE' );
                    break;
                }
                case 'success': {
                    this.$store.commit( 'SET_UPDATE_COMPONENT_SUCCESS', true );
                    break;
                }
                case 'fail': {
                    this.$store.commit( 'HIDE_UPDATE' );

                    alert( { msg, btns: [ '知道了' ] } );
                }
            }
        },
        projectUpdate ( { name, path, version } ) {
             this.project.forEach( ( item, index ) => {
                if ( item.path === path ) {
                    this.$store.commit( 'UPDATE_PROJECT', { index, name, path, version, } );
                }
            } )
        },
        projectNewAndAdd ( flag, { name, path, version } ) {
            // 检查是否有相同路径
            let isExists = false;

            this.project.forEach( ( item ) => {
                item.path === path ? isExists = true : void 0;
            } )

            if ( isExists ) {
                alert( '已存在相同路径项目' );

                return void 0;
            }

            const id = window.appUtil.UUID( );

            const project = {
                id, name, path, version,
                dev: { launch: false, run: false, stop: false }, build: false,
            };

            this.$store.commit( 'ADD_PROJECT', { index: 0, project } );
            this.$store.commit( 'SET_VIEW_INDEX', 1 );

            window.eventBus.$emit( 'PROJECT_NEW_RESET' );

            this.$store.commit( 'SET_VIEW_INDEX', 1 );

            switch ( flag ) {
                case 'new': {
                    alert( '新建项目成功' );
                    break;
                }
                case 'add': {
                    // alert( '增加项目成功' );
                    break;
                }
            }
        },
        messager ( { type, data } ) {
            switch ( type ) {
                case 'log': {
                    let { type, config, msg } = data;

                    if ( type.indexOf( 'workflow_' ) === 0 ) {
                        type = type.replace( 'workflow_', '' );

                        if ( type.indexOf( 'dev' ) == 0 ) {
                            type = type.replace( 'dev_', '' );

                            this.$store.commit( 'SET_LOG', { data: config, msg: { type, msg } } );
                        }
                        else if ( type.indexOf( 'build' ) == 0 ) {
                            type = type.replace( 'build_', '' );

                            this.$store.commit( 'SET_PANEL_LOG', { id: config.id, type: 'build', value: msg } );

                            this.$store.commit( 'SET_LOG', { data: config, msg: { type, msg } } );
                        }
                    }

                    break;
                }
                case 'error': {

                    break;
                }
                case 'event': {
                    alert( data );
                    break;
                }
            }
        },
        projectWorkflow ( { type, state, data } ) {
            if ( typeof data === 'string' ) {
                data = JSON.parse( data );
            }

            const { id, workflow } = data;

            let project = void 0;
            let index = void 0;

            this.project.forEach( ( item, i ) => {
                if ( item.id === id ) {
                    project = item;
                    index = i;
                }
            } );

            if ( !project ) {
                return void 0;
            }

            if ( type === 'dev' ) {
                switch ( state ) {
                    case 'launch': {
                        this.$store.commit( 'SET_PROJECT_WORKFLOW_DEV_IN_STATE', { index, attr: 'launch' } );
                        break;
                    }
                    case 'run': {
                        this.$store.dispatch( 'setPanelLogForDevRun', data );
                        this.$store.commit( 'SET_PROJECT_WORKFLOW_DEV_IN_STATE', { index, attr: 'run' } );
                        break;
                    }
                    case 'stop': {
                        this.$store.dispatch( 'setPanelLogForDevStop', data );
                        this.$store.commit( 'SET_PROJECT_WORKFLOW_DEV_IN_STATE', { index, attr: 'none' } );
                        break;
                    }
                }
            }

            if ( type === 'build' ) {
                switch ( state ) {
                    case 'run': {
                        this.$store.commit( 'SET_PROJECT_WORKFLOW_BUILD_IN_STATE', { index, value: true } );
                        break;
                    }
                    case 'stop': {
                        if ( workflow === 'buildStop' ) {
                            this.$store.dispatch( 'setPanelLogForBuildStop', data );
                        }

                        this.$store.commit( 'SET_PROJECT_WORKFLOW_BUILD_IN_STATE', { index, value: false } );
                        break;
                    }
                }
            }
        },
    },
};
</script>
