<template>
    <div @click="click">{{ m }}</div>
</template>

<style lang="scss" scoped>
div {
    color: green;
}
</style>

<script>
export default {
    data () {
        return {
            m: 't1',
        }
    },
    methods: {
        click () {
            console.log('t1');
        },
    },
};
</script>
