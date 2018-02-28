<template>
    <div class="form-item">
        <label>{{ item.label }}</label>
        <div class="form-item-content">
            <div class="choose" @click="toggleOptions">
                <span :class="[ typeof chooseIndex !== 'undefined' ? '' : 'placeholder' ]">
                    {{ typeof chooseIndex !== 'undefined' ? item.options[ chooseIndex ].label : ( item.placeholder || '' ) }}
                </span>
                <div class="options" v-show="isShowOptions">
                    <div class="options-item" v-for="( item, $index ) in item.options" :key="$index" @click="choose( $index )">{{ item.label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.choose {
    position: relative;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    &:after {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: $formAssistFontBGColor transparent transparent transparent;
        content: "";
    }
}

.options {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    z-index: 9;
    border: 1px solid $borderColor;
    border-top: none;
}

.options-item {
    padding: 0 10px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #FFF;
    border-bottom: 1px solid $borderColor;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow: hidden;
    transition: all .1s ease;
    &:last-of-type {
        border-bottom: none;
    }
    &:hover {
        color: $whiteColor;
        background-color: $mainColor;
        cursor: pointer;
    }
}

</style>

<script>
export default {
    props: [ 'item', 'index', 'value' ],
    data ( ) {
        return {
            chooseIndex: void 0,
            isShowOptions: false,
        }
    },
    created ( ) {
        this.setChooseIndexFromValue( );
    },
    methods: {
        setChooseIndexFromValue ( ) {
            const { value, item } = this;

            if ( value && item.options ) {
                item.options.forEach( ( i, index ) => {
                    i.value == value ? this.chooseIndex = index : void 0;
                } );
            }
        },
        toggleOptions ( ) {
            this.isShowOptions = !this.isShowOptions;
        },
        choose ( index ) {
            this.$emit( 'choose', { index: this.index, value: this.item.options[ index ].value } )
        },
    },
    watch: {
        value ( v ) {
            this.setChooseIndexFromValue( );
        },
    },
};
</script>
