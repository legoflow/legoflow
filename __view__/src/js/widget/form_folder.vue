<template>
    <div class="form-item">
        <label>{{ item.label }}</label>
        <div class="form-item-content">
            <div class="choose" @click="choose">
                <span :class="[ value ? '' : 'placeholder' ]">
                    {{ value ? value : ( item.placeholder || '' ) }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.choose {
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<script>
export default {
    props: [ 'item', 'index', 'value' ],
    methods: {
        async choose ( ) {
            const path = await window.appUtil.openDialog( );

            path && this.$emit( 'choose', { index: this.index, value: path } );
        }
    },
};
</script>
