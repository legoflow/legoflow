import test from './components/test';

new Vue({
    el: 'app',
    components: {
        test,
    },
    render (h) {
        return (<div id="app"><test/></div>)
    }
})

function y ( target, key, descriptor ) {
    target[ key ]();
}

class X {
    @y
    say () {
        console.log( 'x' );
    }
}
