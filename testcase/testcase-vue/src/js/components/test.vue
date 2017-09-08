<template>
    <h1>{{ msg }}</h1>
</template>

<style lang="scss" scoped>
h1 {
    width: 100%;
    color: red;
    text-align: center;
}
</style>

<script>
export default {
    data () {
        return {
            msg: 'foo',
        }
    },
};
</script>
