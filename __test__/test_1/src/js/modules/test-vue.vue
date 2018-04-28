<template>
    <div id="app">
        {{ msg }} - {{ storeMsg }}
    </div>
</template>

<style lang="scss" scoped>
@import "~varScss";

#app {
    font-size: 30px;
    font-weight: 600;
    color: $fontColor;
    transition: all .2 esase;
}
</style>

<script>
export default {
    computed: {
        storeMsg ( ) {
            return this.$store.state.msg;
        }
    },
    data ( ) {
        return {
            msg: 'vue',
        }
    },
    async created ( ) {
        console.log( '[vue-file-optional-chaining-test]', this.test?.( ) );

        const testPromise = ( name ) => {
            return new Promise( ( resolve, reject ) => {
                setTimeout( ( ) => {
                    resolve( `Hello ${ name }` );
                }, 3000 );
            } );
        }

        this.msg = await testPromise( this.msg );
        this.$store.commit( 'SET_MSG', await testPromise( this.storeMsg ) )
    },
};
</script>
