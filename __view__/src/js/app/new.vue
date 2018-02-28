<template>
    <div class="view-content new">
        <widget-form :form="form"></widget-form>
        <button class="new-btn">创建项目</button>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.new {
    position: relative;
    width: 100%;
    height: 100%;
}

.new-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    font-size: 14px;
    letter-spacing: 1px;
    color: $mainColor;
    background-color: rgba( 0, 0, 0, 0 );
    border: none;
    box-shadow: 0 2px 10px rgba( 0, 144, 255, .2);
    border-top: 1px solid $mainColorBorderColor;
    cursor: pointer;
    transition: all .2s ease;
    &:active {
        background-color: $mainColor;
        color: $whiteColor;
    }
}
</style>

<script>
export default {
    data ( ) {
        return {
            form: [
                { label: '项目名称', type: 'input', placeholder: '必填' },
                { label: '项目类型', type: 'select', placeholder: '必选', options: [ { label: 'PC', value: 'pc' }, { label: 'Mobile', value: 'mobile' }, { label: 'Vue.js', value: 'vue' } ] },
                { label: '项目路径', type: 'folder', placeholder: '必选' },
                { label: '项目版本', type: 'input', placeholder: '必填', value: '0.0.1' },
                { label: 'ES NEXT', type: 'radio', checked: true },
                { label: '路径为源文件夹', type: 'radio' },
            ]
        }
    },
};
</script>
