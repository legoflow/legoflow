<template>
    <div id="app">
        {{ msg }} - {{ storeMsg }}
        <slot :text="'tttttt'"></slot>
    </div>
</template>

<style lang="scss" scoped>
@import "~varScss";

@font-face {
	font-family: 'ttt';
	src: url( ./monaco.ttf )  format('truetype');
}

#app {
    font-family: ttt;
    font-size: 30px;
    font-weight: 600;
    color: $fontColor;
    transition: all .2 esase;
    background-image: url( ./1.png );
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
