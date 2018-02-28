<template>
    <div class="form">
        <component
            v-for="( item, $index ) in form"
            :key="$index"
            :is="typeComponentAdapter( item.type )"
            :item="item"
            :index="$index"
            :value="values[ $index ]"
            @choose="choose"
        ></component>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.form {
    position: relative;
    width: 100%;
}

.form /deep/ .form-item {
    position: relative;
    padding: 0 20px 0 70px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid $borderColor;
    * {
        font-size: 12px;
    }
    label {
        position: absolute;
        top: 0;
        left: 10px;
        width: 50px;
        height: 100%;
        letter-spacing: .5px;
        display: block;
        -webkit-touch-callout: none;
        user-select: none;
    }
    .form-item-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .placeholder {
        color: $formAssistFontColor;
    }
}
</style>

<script>
import WidgetFormInput from './from_input';
import WidgetFormSelect from './form_select';
import WidgetFormFolder from './form_folder';
import WidgetFormRadio from './form_radio';

export default {
    components: {
        WidgetFormInput,
        WidgetFormSelect,
        WidgetFormFolder,
        WidgetFormRadio,
    },
    props: [ 'form', 'initValues' ],
    data ( ) {
        return {
            values: [ ],
        }
    },
    created ( ) {
        this.loadValues( );
    },
    methods: {
        typeComponentAdapter ( type ) {
            switch ( type ) {
                case 'input': {
                    return 'widget-form-input';
                    break;
                }
                case 'select': {
                    return 'widget-form-select';
                    break;
                }
                case 'folder': {
                    return 'widget-form-folder';
                    break;
                }
                case 'radio': {
                    return 'widget-form-radio';
                    break;
                }
            }
        },
        choose ( { index, value, } ) {
            Vue.set( this.values, index, value );
        },
        loadValues ( ) {
            this.initValues ? this.values = _.cloneDeep( this.initValues ) : void 0;

            this.values.forEach( ( item, index ) => {
                this.form[ index ].value = item;
            } )
        },
    },
};
</script>
