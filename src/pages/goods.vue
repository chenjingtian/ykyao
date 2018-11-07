<template>
    <div>
        {{cartCount}}
        <section class="topfixed">
            <div class="details-nav">
                <a href="javascript:;"
                   v-for="item,index in navData"
                   :class="{active:index==tabIndex}"
                   @click="tabChange(index)">
                    <span>{{item.text}}</span>
                    <span class="questionsCount" v-if="item.hasN">({{item.number}})</span>
                </a>
            </div>
        </section>
        <div class="content-box">
            <!--产品详情-->

            <div v-if="tabIndex==0 && itemsInfo">
                <div class="information-wrap">
                    <!--商品名称-->
                    <div class="product-name">
                        <span class="pro-name">{{itemsInfo.goodsName}}</span>
                        <span class="collection" :class="{'active':collectionBtn}" @click="collection(itemsInfo.goodsID)"></span>
                    </div>
                    <!--用药指导-->
                    <div class="product-service font24">
                        请按药品说明书或者在药师指导下购买和使用。
                    </div>
                    <!--服务-->
                    <div class="product-service font24">
                        <span>货到付款</span>
                        <span>正品保证</span>
                    </div>
                    <div class="price red">
                        单价：¥<span>{{itemsInfo.salePrice}}</span>
                        市场价：¥<span class="market-price">{{itemsInfo.marketPrice}}</span>
                    </div>
                    <!--产品规格-->
                    <div class="specifi">
                        <ul>
                            <li v-for="item,index in itemsInfo.specifi"
                                :class="{'active':index==specilI}"
                                :data-group="item.dataGroup"
                                @click="chooseSpecifi(item,index)"
                            >
                                {{item.proName}}
                            </li>
                        </ul>
                    </div>
                    <!--产品规格的价格-->
                    <!--<div class="treatment-price">-->
                        <!--<div class="treatment-size">-->
                            <!--<p class="allTreatment-num">-->
                                <!--合计-->
                                <!--<i class="AllTreat" id="goods-group-price">￥{{totalPrice}}</i>-->
                            <!--</p>-->
                            <!--<p class="saveTreatment-num provincial" v-if="savePric>0">-->
                        <!--<span>立省-->
                            <!--<i id="SaveTreat">¥{{savePric}}</i>-->
                        <!--</span>-->
                            <!--</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;选择产品数量&ndash;&gt;-->
                        <!--<div class="treatment-input" v-if="itemsInfo.canBuy">-->
                            <!--<a href="javascript:;" class="num-reduce" @click="changeProNumber(-1)">-</a>-->
                            <!--<input id="goods_amount" type="number" v-model="totalCount">-->
                            <!--<a href="javascript:;" class="num-add" @click="changeProNumber(1)">+</a>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--优惠套餐和养肝大礼包-->
                    <div class="discount-package">
                        <p class="title font28">优惠套餐</p>
                        <!--药师推荐-->
                        <div v-for="items,index in itemsInfo.recommendedPackage">
                            <p class="recommend font26 font_w">{{items.recommend}}</p>
                            <div class="package-content font26">
                                <div class="pro-show">
                                    <ul class="swiper-wrapper">
                                        <li class="swiper-slide" v-for="item,index in items.allPro">
                                            <div class="package-prod-pic">
                                                <a :href="item.proLink">
                                                    <img :src="item.picUrl" alt="">
                                                </a>
                                            </div>
                                            <p class="package-prod-name">{{item.proName}}</p>
                                            <p class="type">{{item.type}}</p>
                                            <p class="package-prod-price">单价：{{item.price}}</p>
                                            <p class="package-prod-numsize font28 red">×{{item.proNumber}}</p>
                                            <p class="package-prod-add"></p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more"></div>
                            </div>
                            <!--<div class="package-settlement">-->
                                <!--<div class="settlement-left">-->
                                    <!--<p class="allTreatment-num">-->
                                        <!--合计-->
                                        <!--<i class="PackagePrice">¥{{items.totalPrice}}</i>-->
                                    <!--</p>-->
                                    <!--<p class="saveTreatment-num">-->
                                        <!--立省-->
                                        <!--<i class="packSaveTreat">¥{{items.savePrice}},原价{{items.originalPrice}}元</i>-->
                                    <!--</p>-->
                                <!--</div>-->
                                <!--<div class="settlement-right box-flex font28">-->
                                    <!--<span id="" class="add-cart" @click="groupAdd(items)" v-if="itemsInfo.canBuy">加入购物车</span>-->
                                    <!--&lt;!&ndash;<span class="zixun" onclick="doxiaonengzx();">立即咨询</span>&ndash;&gt;-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
                <!--说明书-->
                <div class="instructions">
                    <p class="title">{{itemsInfo.goodsName}}说明书</p>
                    <p class="readIt">请仔细阅读说明书并按说明使用或在药师指导下购买和使用</p>
                    <div class="instruction">
                        <ul>
                            <li v-for="item,index in itemsInfo.instructions">
                                <span>{{item.attribute_name}}</span>
                                <span>{{item.attribute_value}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--有问必答-->
            <div class="pro-tab qustion-box" v-if="tabIndex==1">
                    <div class="question-title">
                        <p class="title">有问必答</p>
                        <a href="">去提问</a>
                    </div>
                    <div class="content">
                        <ul>
                            <li v-for="item,index in comment">
                                <p class="question">
                                    <img src="../assets/images/goods/ren.png" alt="">
                                    <span class="qustion">【问】</span>
                                    <span class="text">{{item.consultInfo}}</span>
                                </p>
                                <p class="answer">
                                    <img src="../assets/images/goods/pharmacist.png" alt="">
                                    <span class="qustion red">【答】</span>
                                    <span class="text">{{item.replace_answer}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            <!--用户评价-->
            <div class="pro-tab user-evaluation" v-if="tabIndex==2">
                <p class="title">累计评价<span>{{evaluationTotal}}</span></p>
                <div class="content">
                    <ul>
                        <li v-for="item,index in evaluation"></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--收藏成功弹层-->
        <div class="tk" v-if="showTk">{{collectionMess}}</div>
        <!--遮罩层-->
        <div class="shadow" v-if="showTk"></div>
        <!--购物车按钮-->
        <div class="cart-btn">
            <router-link :to="{name:'cart'}">
                <span class="carN">{{this.$store.state.carPanelData.tCount || 0}}</span>
                <img src="../assets/images/cart.png" alt="">
            </router-link>

        </div>
        <!--底下按钮-->
        <div id="now_buy">
            <a href="javascript:void(0);" id="goods_cal" class="phone-data" onclick="goods.sourceData();">电话回拨</a>
            <a  id="goods_cars" href="javascript:void(0);" class="addCart_data" @click="addCart">加入购物车</a>
            <!--<a id="goods_rev" href="javascript:void(0);" class="addCart_data">需求登记</a>-->
            <a id="goods_ask" href="javascript:void(0);" onclick="doxiaonengzx();">在线咨询</a>
        </div>
    </div>

</template>

<script>
    import itemsData from '@/lib/search/index.js'
    import Bscroll from 'better-scroll';

    import MintUI from 'mint-ui'
    import 'mint-ui/lib/style.css'
    import { Swipe, SwipeItem} from 'mint-ui';
    // import 'vue-layer-mobile/need/layer.css'
    import layer from 'vue-layer-mobile'
    import {mapGetters} from 'vuex'
    import Vue from 'vue';
    Vue.use(MintUI)
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.use(layer)
    import axios from 'axios';
    import qs from 'qs';


    export default {
        name:'Index',
        data(){
            return{
                dots:[1,2],
                currentPageIndex:0,
                navData:[
                    {
                        text:'基本信息',
                        hasN:false,
                        number:0
                    },
                    {
                        text:'有问必答',
                        hasN:true,
                        number:1
                    },
                    {
                        text:'用户评价',
                        hasN:true,
                        number:12
                    },
                ],
                tabIndex:0,
                cust_id:this.getCookie("WANSONSHOP_IDENTIFIER"),
//                是否收藏
                collectionBtn:false,
//                收藏成功与否提示
                collectionMess:'',
//                收藏弹层显示和隐藏
                showTk:false,
                itemsList:itemsData,

                itemsCount:1,
                // 详情页商品id
                goodsId:'',
                // 有问必答的内容
                comment:null,

                // 有问必答的当前请求页数
                commentPage:1,
                // 用户评价的内容
                evaluation:null,

                // 用户评价当前请求页数
                evaluationPage:1,
                cartNumber:0,
                 // 准备加入购物车的套装id
                groupId:"12764",
                specilI:0,
                carCount:0,


            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true,
            },
            autoPlay: {
                type: Boolean,
                default: true,
            },
            interval: {
                type: Number,
                default: 1000
            }
        },
        computed:{
            // 根据商品id筛选要展示在详情页的商品
            itemsInfo () {
                let itemsInfor = this.itemsList.data.list.filter((item) => {
                    console.info('loop data:',item,`有没有goodsId${this.goodsId?'有':'没有'}`,this.goodsId);
                    if(this.goodsId){
                        return item.goodsID==this.goodsId
                    }
                })[0]
                return itemsInfor||[]
            },

            specifiIndex(){
                return this.itemsInfo.specifi?this.specilI:null
            },
            // 产品规格选中
            // specifiIndex(){
            //     return this.itemsInfo.specifi?0:null;
            // },
            // // 商品价格合计
            // totalPrice(){
            //     return this.itemsInfo.specifi?(this.itemsInfo.specifi[this.specifiIndex].group_privilege_price*this.totalCount).toFixed(2):0
            // },
            // // 节省金额合计
            // savePric(){
            //     return this.itemsInfo.specifi?(this.itemsInfo.specifi[this.specifiIndex].discountPrice*this.totalCount).toFixed(2):0
            // },
            // 加入购物车的数量

            // ...mapGetters({
            //     totalCount:state=>state.carPanelData.tCount
            // })
        },
        // watch:{
        //     totalCount:function (oldVal,newVal) {
        //         this.carCount=newVal
        //     }
        // },
        methods: {
            // 头部导航切换
            tabChange(index){
                this.tabIndex=index;
                if(index==1){
                    this.getComment()
                }else if(index==2){
                    this.getEvaluation()
                }
            },
            // ajax请求有问必答
            // getComment(){
            //     axios.post('/ajax-shop/default/goods.ajax?operFlg=13',qs.stringify({twoPostID:this.goodsId,page:1,grade:0,viewFlag:2}))
            //         .then(o=>{
            //             this.comment=o.data.data.goods_comment;
            //             this.navData[1].number=o.data.data.count
            //         })
            // },
            // ajax请求用户评价
            // getEvaluation(){
            //     axios.get('/ajax-shop/default/goods.ajax?operFlg=13',qs.stringify({twoPostID:this.goodsId,page:1,grade:0,viewFlag:1}))
            //         .then(o=>{
            //             this.evaluation=o.data.comm;
            //             this.navData[2].number=o.data.count
            //         })
            // },
//            获取用户登录的cookie
            getCookie(cookieName){

                var strCookie = document.cookie;

                var arrCookie = strCookie.split("; ");
                var arrCookieCount = arrCookie.length;
                var arr,identifyContent = null;
                for(var i = 0; i < arrCookie.length ; i++){
                    arr = arrCookie[i].split("=");
                    if(cookieName == arr[0]){
                        var arrStr = document.cookie.split("; ");
                        identifyContent = decodeURIComponent(decodeURIComponent(arr[1]));
                        break;
                    }
                }
                arrCookie = null;
                if (identifyContent == null)
                    return null;
                else
                    return identifyContent;
            },
            collection(id){
                if (!this.getCookie("WANSONSHOP_IDENTIFIER")) {
                    this.$router.push({name:'login',query:{'call_back':id}})
                } else {
                    if(!this.collectionBtn){
                        this.collection[id]=id;
                        axios.post('/ajax-shop/default/custCollect.ajax?operFlg=4',qs.stringify({'postID':id}))
                            .then((response)=>{
                                this.result(response)
                            })
                    }else{
                        let delArr = new Array();
                        delArr.push(id);
                        axios.post('/ajax-shop/default/custCollect.ajax?operFlg=2',qs.stringify({delArr:delArr}))
                            .then((response)=>{
                                if (response.data.code == 200) {
                                    this.collectionBtn=false;
                                } else {
                                    this.showTk=true;
                                    this.collectionMess=response.data.message;
                                    setTimeout(()=>{
                                        this.showTk=false
                                    },2000)
                                }
                            })
                    }
                }
            },
            result(o){
                if( o.data.code == 10000 ){
                    this.showTk=true;
                    this.collectionMess='请先登录';
                    setTimeout(()=>{
                        this.showTk=false
                    },2000)
                    return false;
                }
                if (o.data.code == 200 ){
                    this.showTk=true;
                    this.collectionMess=o.data.message;
                    setTimeout(()=>{
                        this.showTk=false
                    },2000)
                } else {
                    this.showTk=true;
                    this.collectionMess=o.data.message;
                    setTimeout(()=>{
                        this.showTk=false
                    },2000)
                }
                this.collectionBtn=true;
            },
            // 选择商品规格
            chooseSpecifi(item,index){
                this.specilI=index;
                this.items=1;
                this.groupId=item.dataGroup
            },
            // 检查库存
            checkGoods(){
                axios.get('')
            },
            // 增减商品数量
            changeProNumber(way){
                if(way>0){
                    this.items++
                }else{
                    if(this.items>1){
                        this.items--
                    }
                }
            },
            // 底部的加入购物车
            addCart(){
                this.$store.dispatch('addCarPanelData', {data:this.itemsInfo,specifiIndex:this.specifiIndex,totalCount:this.itemsCount})
                console.log('pro')
            },

            // 添加推荐套装商品到购物车
            groupAdd(item){
                axios.post('/ajax-shop/default/cart.ajax?operFlg=103',qs.stringify({groupID:item.groupID,group_amount:1}))
                    .then(response=>{
                        if(response.data.code==200){
                            // layer.alert('加入购物车成功!', {icon: 1,btn:false,time:2000 });
                        }else{
                            this.$layer.msg({
                                content: response.data.message,
                                time: 2000, // 自动消失时间 toast类型默认消失时间为2000毫秒,
                            })
                        }
                    })
                    .catch(err=>console.log(err))
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
                console.log('这里是路由入口',to.params.goodsId);
                vm.goodsId=to.params.goodsId;
            })
        },

        // 当组件挂载完毕后
        // 拿到这个id就可以放在接口里请求数据了
        mounted () {
            console.log('this is mounted');
            // this.setSliderWidth(); //设置轮播图的宽度
            // this.init();
            // if(this.autoPlay) {
            //     this.play();
            // }
            // this.getComment();
            // this.getEvaluation()
            // this.$nextTick(()=>{
            //     this.scroll=new Bscroll(this.$refs.wrapper,{})
            // })
        },
        created(){
            console.log('components init');
        }
    }
</script>
