// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.scss'
import 'lib-flexible'
import store from '@/store'
import toastC from '@/components/toast'

// Vue.use(toastC)


Vue.config.productionTip = false

Vue.prototype.collection={};
var whitelist=['myCollection','memberCenter']

// router.beforeEach((to,from,next)=>{
//     if(whitelist.indexOf(to.name)>=0){
//         let userInf=JSON.parse(sessionStorage.getItem('userInfor'))
//         if(userInf){
//             next()
//         }else{
//             next({name:'login'})
//         }
//     }else{
//         next()
//     }
// })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
