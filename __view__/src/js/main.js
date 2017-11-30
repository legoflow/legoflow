'use strict';

import layoutApp from './layout/app';

import store from './store';

new Vue({
    el: 'app',
    store,
    components: {
        layoutApp,
    },
    render ( h ) {
        return (
            <layout-app></layout-app>
        )
    },
})
