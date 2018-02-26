<template>
    <div class="form-item">
        <label>{{ item.label }}</label>
        <div class="form-item-content">
            <input type="text" :placeholder="item.placeholder" :value="item.value">
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
    props: [ 'item' ],
};
</script>
