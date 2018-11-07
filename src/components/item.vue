<template>
    <li>
        <router-link :to="{name:'goods', params: {goodsId: item.goodsID}}">
            <div class="pro_chen">

                <div class="pro_img">
                    <!--<img src="&lt;!&ndash;{$lists.promotion_tag2.0.image}&ndash;&gt;" alt="" class="icon-1" style="width:.5rem;height:.5rem;right:2%;top:1%;z-index:303;position: absolute;">-->
                    <img :src="item.goodsMainPic" :alt="item.goodsName" width="100%">
                </div>
                <div class="pro_describe">
                    <div class="pro-name-box">
                        <!--<span class="drug-category">-->
                        <!--<img src="/wap/theme/xth1/images/OTCblue.png" title="处方药" alt="处方药"  style="width: 12%;vertical-align: text-bottom;">-->
                        <!--<img src="/wap/theme/xth1/images/OTCgreen.png"  title="乙类非处方药" alt="乙类非处方药" style="width: 12%;vertical-align: text-bottom;">-->
                        <!--<img src="/wap/theme/xth1/images/OTCred.png" title="甲类非处方药" alt="甲类非处方药" style="width: 12%;vertical-align:  text-bottom;">-->
                        <!--</span>-->
                        <span class="drug-name">{{item.goodsName}}</span>
                    </div>
                    <p class="pro-ad"><!--{$lists.brief}--></p>
                    <p class="pro-price">
                        <span class="pro_price">¥{{item.salePrice}}</span>
                        <a href="javascript:;" onclick="doxiaonengzx();" class="online_ask">在线咨询</a>
                    </p>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
    import Vue from 'vue';

    export default {
        name:'Index',
        data(){
            return{

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
            // toGoods (id) {
            //     debugger
            //     this.$router.push({path: '/goods/?id=' + id})
            // }
        },
    }
</script>

<style>


</style>
