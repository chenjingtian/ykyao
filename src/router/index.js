import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Search from '@/pages/search'
import Goods from '@/pages/goods'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Category from '@/pages/category'
import MyCollection from '@/pages/mycollect'
import MemberCenter from '@/pages/memberCenter'
import Cart from '@/pages/cart'
import Total from '@/pages/total'
import Checkout from '@/pages/checkout'
import Address from '@/pages/address'
import Address2 from '@/pages/address2'
import Recharge from '@/pages/recharge'
import MemberOrder from '@/pages/memberOrder'

Vue.use(Router)
console.log('router init');
export default new Router({

    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,

        },
        {
            // path: '/goods',
            path: '/goods/:goodsId',
            name: 'goods',
            component: Goods
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/category',
            name: 'category',
            component: Category
        },
        {
            path: '/myCollection',
            name: 'myCollection',
            component: MyCollection
        },
        {
            path: '/memberCenter',
            name: 'memberCenter',
            component: MemberCenter,
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/checkout',
            name: 'checkOut',
            component: Checkout
        },
        {
            path: '/address',
            name: 'address',
            component: Address
        },
        {
            path: '/address2',
            name: 'address2',
            component: Address2
        },
        {
            path: '/recharge',
            name: 'recharge',
            component: Recharge
        },
        {
            path: '/memberOrder',
            name: 'memberOrder',
            component: MemberOrder
        }
    ]
})
