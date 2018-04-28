<template>
    <div class="form-item form-item-separate">
        <p>{{ item.label }}</p>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.form-item-separate {
    padding-left: 10px !important;
    overflow: hidden;
    p {
        font-size: 10px !important;
        color: $formAssistFontColor;
    }
}
</style>

<script>
export default {
    props: [ 'item', 'index', 'value' ],
};
</script>
