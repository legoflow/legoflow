'use strict';

// widget
Vue.component( 'widget-form', require('./widget/form') );

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
