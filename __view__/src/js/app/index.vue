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
};
</script>
