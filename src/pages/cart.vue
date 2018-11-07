<template>
    <div class="myCart-box">
        <div class="myCart-title clear font30">
            <span class="fl">购买列表</span>
            <a href="/wap/member_shopping.html" class="fr">快速复购</a>
        </div>
        <!--购物车为空-->
        <div class="empty-pro" v-if="carGoodsData.tCount<1">
            <img src="../assets/images/cart/empty.png" alt="">
            <p>还没有要买的药品</p>
            <router-link to="/">返回商城首页</router-link>
        </div>
        <!--购物车不为空-->
        <div class="prolist" v-if="carGoodsData && carGoodsData.tCount>=1">
            <ul v-if="carGoodsData.groupList">
                <li v-for="item,index in carGoodsData.groupList">
                    <div class="check-box"
                         :class="{checked:item.checked}"
                         @click="checkPro(item,'groupList',item.dataGroup)"
                    ></div>
                    <div class="pro-detalis">
                        <div class="group-title">【套装】{{item.group_name}}</div>
                        <dl class="group-goods" v-for="pro,index in item.goods">
                            <dt>
                                <a :href="pro.link">
                                    <img :src="pro.img_link" alt="">
                                </a>
                            </dt>
                            <dd>
                                <a :href="pro.link">
                                    <p class="pro-name">{{pro.goodsName}}</p>
                                    <p class="pro-ad"></p>
                                    <p class="red">×{{pro.groupCount}}</p>
                                    <p class="taozhuang-num" v-if="pro.taozhuang">{{pro.is_buy}}</p>
                                </a>
                                <p class="price">￥{{pro.salePrice}}</p>
                                <div class="number-del">
                                    <div class="choose-num">
                                        <a href="javascript:;" class="num-reduce" @click="changeProNumberChen(-1,item)">-</a>
                                        <input type="number" max="1000" min="1" v-model="item.chenCount">
                                        <a href="javascript:;" class="num-add" @click="changeProNumberChen(1,item)">+</a>
                                    </div>
                                    <div class="del-pro" @click="delPro(item,item.dataGroup,true)"></div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </li>
            </ul>
            <ul v-if="carGoodsData.goodsList">
                <li v-for="item,index in carGoodsData.goodsList">
                    <div class="check-box"
                         :class="{checked:item.checked}"
                         @click="checkPro(item,'goodsList',item.goodsID)"
                    ></div>
                    <div class="pro-detalis">

                        <dl class="group-goods">
                            <dt>
                                <a :href="item.link">
                                    <img :src="item.img_link" alt="">
                                </a>
                            </dt>
                            <dd>
                                <a :href="item.link">
                                    <p class="pro-name">{{item.goodsName}}</p>
                                    <p class="pro-ad"></p>
                                </a>
                                <p class="price">￥{{item.salePrice}}</p>
                                <div class="number-del">
                                    <div class="choose-num">
                                        <a href="javascript:;" class="num-reduce" @click="changeProNumberChen(-1,item)">-</a>
                                        <input type="number" max="1000" min="1" v-model="item.chenCount">
                                        <a href="javascript:;" class="num-add" @click="changeProNumberChen(1,item)">+</a>
                                    </div>
                                    <div class="del-pro" @click="delPro(item,item.goodsID,false)"></div>
                                </div>
                            </dd>
                        </dl>

                    </div>
                </li>
            </ul>
        </div>
        <div class="selectAll" v-if="carGoodsData.tCount>=1">
            <div>
                <span
                    class="check_btn selectAll-btn"
                    @click="checkedAllHander(isallChecked)"
                    :class="{checked:isallChecked}">
                全选</span>
                <span @click="delCheckedProHandle">删除选中的商品</span>
            </div>
            <div class="toBuy">
                <div>
                    <!--<p>共<span>{{count}}</span>件商品</p>-->
                    <!--<p class="total red">合计<span class="font30">¥{{totalMount}}</span></p>-->
                </div>
                <div class="settlement">
                    <router-link :to="{name:'checkOut'}">去结算</router-link>
                </div>
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '@/components/footer'
    import {mapState} from 'vuex'
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name:'Index',
        data(){
            return{
                carGoodsData:this.$store.state.carPanelData
            }
        },
        // watch:{
        //     carGoodsData:function (newVal,oldVal) {
        //         this.carGoodsData=newVal
        //         // val=this.$store.state.carPanelData
        //     }
        // },
        computed:{
            // 购物车为不为空
            // count(){
            //     const {carPanelData} = this.$store.state;
            //
            //     this.$store.commit('updateCarPanelData',carPanelData)
            //     return this.$store.getters.totleCount
            // },
            // 是不是全选
            isallChecked(){
                return this.$store.getters.allChecked
            },
            // carGoodsData () {
            //     return this.$store.state.carPanelData
            // },
            // totalMount(){
            //
            //     let totalM=0;
            //     this.carGoodsData.forEach(item=>{
            //         totalM+=parseFloat(item.salePrice*item.count)
            //     },0)
            //     return totalM.toFixed(2)
            // },
        },
        methods: {
            // 商品数量增减
            changeProNumberChen(way,item){
                this.$store.commit('changeProNumber',{way,item});
                this.$store.commit('updateCarPanelData')

            },
            // 选中取消产品
            checkPro(item,kind,id){
                this.$store.commit('checkGoods',{item,kind,id});
            },
            //
            // // 删除单个商品
            delPro(item,id,isGroup){
                this.$store.commit('delPanlData',{item,id,isGroup});
            },
            // // 删除选中的商品
            delCheckedProHandle(){
                this.$store.commit('delCheckedPro')
            },
            // // 全选
            // checkedAllHander(checked){
            //    this.$store.commit('allGoodsCheck',checked)
            // },
            // // 去结算
            // toCheck(){
            //     if(this.checkedCount<1){
            //         alert('请选择要购买的商品！')
            //     }
            // },

        },

        mounted(){
            // this.$store.dispatch('cartInfor')
            //     console.log(this.carGoodsData)
            // this.checkedCount=this.checkedCountCom
            // this.ischeckedAll=this.ischeckedAllCom
        },
        components:{
            footerNav
        },
    }
</script>
