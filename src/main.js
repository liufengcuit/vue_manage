import App from './App.vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局样式
import './assets/scss/index.scss';
import './icomoon/style.css';


import $api from './services/index';
import $http from './axios/index'


Vue.use(ELEMENT);

//系统错误捕获
const errorHandler = (error, vm)=>{
    console.error(vm);
    console.error(error);
}
Vue.config.errorHandler = errorHandler;

Object.assign(Vue.prototype, {
    $api,
    $http,
    $size: 'small',
    $throw: error=> errorHandler(error,this)
})


/**
 * 解决点击同一路由报错
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
    NProgress.start();
    // to and from are both route objects. must call `next`.
    if(to.path==='/') {
        next("/login")
    }else{
        next()
    }
})

router.afterEach(transition => {
    NProgress.done();
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
