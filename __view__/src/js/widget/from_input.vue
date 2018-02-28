<template>
    <div class="form-item">
        <label>{{ item.label }}</label>
        <div class="form-item-content">
            <input type="text" :placeholder="item.placeholder" v-model="valueCopy">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgba( 0, 0, 0, 0 );
}

::-webkit-input-placeholder {
    color: $formAssistFontColor;
}
</style>

<script>
export default {
    props: [ 'item', 'index', 'value' ],
    data ( ) {
        return {
            valueCopy: this.value,
        }
    },
    watch: {
        valueCopy ( v ) {
            this.$emit( 'choose', { index: this.index, value: v } );
        },
        value ( v ) {
            this.valueCopy = _.cloneDeep( this.value );
        },
    },
};
</script>
