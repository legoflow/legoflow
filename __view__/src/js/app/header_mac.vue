<template>
    <header>
        <div class="panel">
            <div class="panel-ico" @click="panelItemAction( 'close' )"></div>
            <div class="panel-ico" @click="panelItemAction( 'min' )"></div>
        </div>
        <div class="menu">
            <div class="menu-active" v-show="isShowMenuActive" :style="{ transform: `translate3d( ${ menuActiveX }, 0, 0 )` }"></div>
            <div class="menu-item" v-for="( item, $index ) in view" :key="$index" @click="chooseItem( $index )">{{ item.label }}</div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "~var";

header {
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: $mainColor;
    z-index: 9999;
}

.menu {
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    .menu-item {
        width: 45px;
        text-align: center;
        color: $whiteColor;
        letter-spacing: 1px;
        font-size: 14px;
        -webkit-touch-callout: none;
        user-select: none;
        cursor: pointer;
    }
    .menu-active {
        position: absolute;
        left: 0;
        bottom: 7px;
        width: 20px;
        height: 2px;
        background-color: $whiteColor;
        border-radius: 2px;
        transition: all .2s ease;
    }
}

.panel {
    position: absolute;
    top: 17px;
    left: 10px;
    height: 12px;
    .panel-ico {
        float: left;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: $whiteColor;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        &:nth-of-type( 1 ) {
            background-color: #FC625D;
        }
        &:nth-of-type( 2 ) {
            margin-left: 7px;
            background-color: #FDBC40;
        }
    }
    &:hover {
        .panel-ico {
            &:nth-of-type( 1 ) {
                background-image: url( ../image/close.png );
                background-size: 6px;
            }
            &:nth-of-type( 2 ) {
                background-image: url( ../image/min.png );
                background-size: 9px;
            }
        }
    }
}
</style>

<script>
export default {
    computed: Vuex.mapState( [ 'view', 'viewIndex' ] ),
    data ( ) {
        return {
            menu: [ ],
            menuActiveX: 0,
            isShowMenuActive: false,
        }
    },
    mounted ( ) {
        this.chooseItem( this.viewIndex );

        Mousetrap.bind( 'left', ( ) => {
            if ( this.viewIndex > 0 ) {
                this.chooseItem( this.viewIndex - 1 );
            }

            return false;
        } );

        Mousetrap.bind( 'right', ( ) => {
            if ( this.viewIndex < this.view.length - 1 ) {
                this.chooseItem( this.viewIndex + 1 );
            }

            return false;
        } );
    },
    methods: {
        chooseItem ( index ) {
            this.menuActiveX = `${ index * 45 + 12 }px`;

            this.$store.commit( 'SET_VIEW_INDEX', index );

            !this.isShowMenuActive ? this.isShowMenuActive = true : void 0;
        },
        panelItemAction ( flag ) {

        },
    },
};
</script>
