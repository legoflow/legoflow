const routes = [
    {
        path: '/',
        component: r => require.ensure([], () => r(require('./components/test')), 'test'),
    },
];

const router = new VueRouter({
    routes,
})

new Vue({
    el: 'app',
    router,
    render ( h ) {
        return (
            <router-view></router-view>
        )
    }
})
