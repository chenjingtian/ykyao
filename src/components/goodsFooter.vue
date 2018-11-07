
<template>
    <div>
        <div class="footer-nav">
            <div class="footer-zx">
                <img :src="zxData.imgSrc" alt="">
                <p>{{zxData.text}}</p>
            </div>
            <ul>
                <li v-for="item,index in footerNavData">
                    <router-link :to="{name:item.link}">
                        <img :src="item.imgSrc" alt="">
                        <p>{{item.text}}</p>
                    </router-link>

                </li>
            </ul>
        </div>

    </div>



</template>

<script>


    import Vue from 'vue';

    export default {
        name:'Index',
        data(){
            return{
                footerNavData:[
                    {
                        link:'',
                        imgSrc:require('../assets/images/footer/icon2.png'),
                        text:'首页',
                    },
                    {
                        link:'category',
                        imgSrc:require('../assets/images/footer/icon3.png'),
                        text:'找药',
                    },
                    {
                        link:'',
                        imgSrc:require('../assets/images/footer/icon4.png'),
                        text:'购物车',
                    },
                    {
                        link:'',
                        imgSrc:require('../assets/images/footer/icon5.png'),
                        text:'我',
                    },
                ],
                zxData:{
                    imgSrc:require('../assets/images/footer/footer-zx.png'),
                    text:'咨询'
                },

            }
        },
        props:{
            item:{
                type:Object
            }
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
