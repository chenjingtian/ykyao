
<template>
    <div>
        <!--<div class="title-top">-->
            <!--<img src="../assets/images/memberCenter/member-header.png" alt="">-->
            <!--<p>-->
               <!--普通会员 | {{userInfor.custID}} | 积分:{{userInfor.points}}-->
            <!--</p>-->
        <!--</div>-->
        <div class="common-style my-order">
            <p class="title font30">我的订单</p>
            <ul>
                <li v-for="item,index in myOrder" :key="index">

                    <router-link :to="item.link">
                        <img :src="item.imgSrc" alt="">
                        <p>{{item.text}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="common-style my-tools">
            <p class="title font30">我的工具</p>
            <ul>
                <li v-for="item,index in myTools" :key="index">
                    <router-link :to="item.link.name">
                        <img :src="item.imgSrc" alt="">
                        <p>{{item.text}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name:'Index',
        data(){
            return{
                userInfor:null,
                myOrder:[
                    {
                        text:'全部订单',
                        imgSrc:require('../assets/images/memberCenter/user-icon1.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'待付款',
                        imgSrc:require('../assets/images/memberCenter/user-icon2.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'待发货',
                        imgSrc:require('../assets/images/memberCenter/user-icon3.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'待评价',
                        imgSrc:require('../assets/images/memberCenter/user-icon4.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'退换货',
                        imgSrc:require('../assets/images/memberCenter/user-icon5.png'),
                        link:{name:'memberOrder'}
                    },

                ],
                myTools:[
                    {
                        text:'我的收藏',
                        imgSrc:require('../assets/images/memberCenter/user-icon6.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'我的足迹',
                        imgSrc:require('../assets/images/memberCenter/user-icon7.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'在线咨询',
                        imgSrc:require('../assets/images/memberCenter/user-icon8.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'积分商场',
                        imgSrc:require('../assets/images/memberCenter/user-icon9.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'地址管理',
                        imgSrc:require('../assets/images/memberCenter/user-icon10.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'我的积分',
                        imgSrc:require('../assets/images/memberCenter/user-icon11.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'优惠券',
                        imgSrc:require('../assets/images/memberCenter/user-icon12.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'我的评价',
                        imgSrc:require('../assets/images/memberCenter/user-icon13.png'),
                        link:{name:'memberOrder'}
                    },
                    {
                        text:'退出',
                        imgSrc:require('../assets/images/memberCenter/login-out.png'),
                        link:{name:'login'}
                    }

                ]
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
                vm.userInfor=JSON.parse(sessionStorage.getItem('userInfor'))
            })
        },
        mounted(){

        },
        methods: {


        },

        components:{
        }
    }
</script>

<style>


</style>
