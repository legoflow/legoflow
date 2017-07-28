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


import './t.ts';
