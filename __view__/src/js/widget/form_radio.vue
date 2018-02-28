<template>
    <div class="form-item">
        <div :class="[ 'radio', value ? 'checked' : void 0 ]"></div>
        <div class="radio-label" @click="toggleChecked">
            {{ item.label }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.form-item {
    padding-left: 28px !important;
    cursor: pointer;
}

.radio {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    margin: auto;
    width: 13px;
    height: 13px;
    border: 1px solid $mainColor;
    border-radius: 50%;
    &:before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 9px;
        height: 9px;
        background-color: $mainColor;
        border-radius: 50%;
        content: "";
        opacity: 0;
        transition: opacity .1s ease;
    }
}

.checked {
    &:before {
        opacity: 1;
    }
}

.radio-label {
    -webkit-touch-callout: none;
    user-select: none;
}
</style>

<script>
export default {
    props: [ 'item', 'index', 'value' ],
    methods: {
        toggleChecked ( ) {
            this.$emit( 'choose', { index: this.index, value: !this.value } );
        }
    },
};
</script>
