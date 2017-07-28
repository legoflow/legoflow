import test from './components/test.vue';

function tt ( h ) {
    return (
        <h2>123</h2>
    )
}

new Vue({
    el: 'app',
    components: {
        test,
    },
    render ( h ) {
        return (<div id="app"><test/></div>)
    }
})
