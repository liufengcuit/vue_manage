import Main from '../views/main.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/About.vue')
                }
            },
            {
                path: '/test',
                name: 'test',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: function () {
                    return import(/* webpackChunkName: "test" */ '../views/test.vue')
                }
            },
            {
                path: '/userInfo',
                name: 'userInfo',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: function () {
                    return import(/* webpackChunkName: "userInfo" */ '../views/userInfo.vue')
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import(/* webpackChunkName: "login" */ '../views/login.vue')
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
