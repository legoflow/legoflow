<template>
    <div id="app">
        <component :is="headerComponent"></component>
        <div class="view" :style="{ transform: `translate3d( ${ `${ viewIndex * -100 }%` }, 0, 0 )` }">
            <component
                v-for="( item, $index ) in view"
                key="$index"
                :is="item.component"
                :style="{ left: 100 * $index + '%' }"
            >
            </component>
        </div>
    </div>
</template>

<style lang="scss">
@import "~var";

#app {
    width: 100%;
    height: 100%;
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
import ViewNewComponent from './view_new';
import ViewListComponent from './view_list';
import ViewLogComponent from './view_log';

export default {
    computed: Vuex.mapState( [ 'view', 'viewIndex' ] ),
    components: {
        HeaderMacComponent,
        ViewNewComponent,
        ViewListComponent,
        ViewLogComponent,
    },
    data ( ) {
        return {
            headerComponent: app.system == 'mac' ? 'HeaderMacComponent' : 'HeaderWinComponent',
        }
    },
    mounted ( ) {
        console.log( app );
    },
};
</script>
