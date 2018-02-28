<template>
    <div id="app">
        <component :is="headerComponent"></component>
        <div class="view" :style="{ transform: `translate3d( ${ `${ viewIndex * -100 }%` }, 0, 0 )` }">
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
import NewComponent from './new';
import ListComponent from './list';
import LogComponent from './log';
import UpdateComponent from './update';

export default {
    computed: Vuex.mapState( [ 'view', 'viewIndex' ] ),
    components: {
        HeaderMacComponent,
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
        }
    },
    mounted ( ) {
        window.ipc.mainWindow.show( );

        // setTimeout(() => {
        //     this.$store.commit( 'SHOW_UPDATE' );
        // }, 3000);
    },
    methods: {
        projectNewSuccess ( { name, path, version } ) {
            const id = window.appUtil.UUID( );

            const project = {
                id, name, path, version,
                dev: false, build: false,
            };

            this.$store.commit( 'ADD_PROJECT', { index: 0, project } );
            this.$store.commit( 'SET_VIEW_INDEX', 1 );

            window.eventBus.$emit( 'PROJECT_NEW_RESET' );

            alert( '新建项目成功' );
        },
        messager ( { type, data } ) {
            switch ( type ) {
                case 'info': {

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
    },
};
</script>
