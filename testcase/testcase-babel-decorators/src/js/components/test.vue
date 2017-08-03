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

function foo ( target, key, descriptor ) {
    console.log( target );
    console.log( key );
}

export default {

    @foo
    props: [],

    data () {
        return {
            msg: 'foo',
        }
    },

};
</script>
