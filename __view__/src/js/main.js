'use strict';

// widget
import './widget/alert';
Vue.component( 'widget-form', require('./widget/form') );

// router component
import App from './app';
import Setting from './setting';

// store
import store from './store';

// routes
const routes = [
    { path: '/app', component: App },
    { path: '/setting', component: Setting },
]

// router config
const router = new VueRouter( {
    routes,
} )

new Vue( {
    store,
    router,
    render ( h ) {
        return (
            <router-view></router-view>
        )
    },
} ).$mount( 'app' );
