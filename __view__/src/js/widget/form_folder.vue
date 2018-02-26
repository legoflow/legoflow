<template>
    <div class="form-item">
        <label>{{ item.label }}</label>
        <div class="form-item-content">
            <div class="choose">
                <span :class="[ value ? '' : 'placeholder' ]">
                    {{ value ? value : ( item.placeholder || '' ) }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

</style>

<script>
export default {
    props: [ 'item' ],
    data ( ) {
        return {
            value: '',
        }
    },
};
</script>
