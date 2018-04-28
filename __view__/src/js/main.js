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

document.body.ondragover = document.body.ondragleave = document.body.ondragend = ( ) => {
	return false;
}

document.body.ondrop = ( e ) => {
    if ( e.dataTransfer.effectAllowed == 'move' ) {
		return 0;
	}

	const path = e.dataTransfer.files[ 0 ].path;

    window.ipc.project.add( { path } );

	return false;
}
