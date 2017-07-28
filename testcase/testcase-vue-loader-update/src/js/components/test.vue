<template>
    <h1>
        {{ msg }}
        <div v-html="dom"></div>
        <img src="./close.svg" inline>

        <slot></slot>
        
        <test-js-inline-svg></test-js-inline-svg>
    </h1>
</template>

<style lang="scss" scoped>
h1 {
    width: 100%;
    color: red;
    text-align: center;
    & /deep/ .test {
        color: blue;
    }
}
</style>

<script>
import './test.js';

import t1 from './t1.vue';

export default {
    created () {
        this.$slots.default = [ this.$createElement(t1) ];
    },
    data () {
        return {
            msg: 'foo',
            dom: '<div class="test">DOM</div>'
        }
    },
};
</script>
