<template>
    <div>
        <!-- 这里是父组件调用查询组件的位置，其中@searchClick是一个事件的接收器，这个事件来源于HeadNav组件的emit发射 -->
        <!-- 这里其实相当于是拿到了一个事件，并且执行了这个事件 而执行的事件在父组件被定义成了search函数 -->
        <head-nav @searchClick="search"></head-nav>
        <div class="content-box">
            <div class="banner">
                <Swiper ref="swiper" style="width:100%" v-if="list.length > 0" :autoPlay='true' :showIndicator='true' interval="2500" duration="500">
                    <Slide v-for="(tag,key) in list" :key="key">
                        <img :src="tag.img" />
                    </Slide>
                </Swiper>
                <!--<mt-swipe  ref="swipe" :auto="4000">-->
                <!--<mt-swipe-item>-->
                <!--<img src="http://www.ykyao.com/source/photo/20171013/2017101314183393990.jpg" alt="" width="100%">-->
                <!--</mt-swipe-item>-->
                <!--<mt-swipe-item>-->
                <!--<img src="http://www.ykyao.com/source/photo/20180312/2018031210480584295.jpg" alt="" width="100%">-->
                <!--</mt-swipe-item>-->
                <!--<mt-swipe-item>-->
                <!--<img src="http://www.ykyao.com/source/photo/20180312/2018031210480584295.jpg" alt="" width="100%">-->
                <!--</mt-swipe-item>-->
                <!--</mt-swipe>-->
            </div>
            <div class="index-nav">
                <ul class="clear">
                    <li v-for="item,index in navData">
                        <a href="">
                            <img :src="item.srcUrl" alt="">
                            <span>{{item.text}}</span>
                        </a>
                    </li>

                </ul>
            </div>
            <!--活动一-->
            <div class="goods-list module-box1">
                <ul class="clear">
                    <li>
                        <a href="/wap/points_change.html">
                            <img src="../assets/images/index/activity1.jpg" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="/wap/list-25.html">
                            <img src="../assets/images/index/activity2.jpg" alt="">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="guess-like">
                <div class="guess-title">
                    <img src="../assets/images/index/like.jpg" alt=""><span>猜您喜欢</span>
                </div>
                <div class="like-pro-list">


                    <div v-for="item,index in goodData" :index="index" class="goods_box">
                        <!--<a :href="item.link">-->
                        <!--<img :src="item.goodsMainPic" :alt="item.goodsName">-->
                        <!--</a>-->
                        <!--<div class="pro-infor">-->
                        <!--<p class="pro-name">{{item.goodsName}}</p>-->
                        <!--<p class="pro-price clear">-->
                        <!--<span class="fl now-price">{{item.salePrice}}</span>-->
                        <!--<span class="fr old-price">{{item.marketPrice}}</span>-->
                        <!--</p>-->
                        <!--</div>-->
                        <div v-for="item,index in item" class="goods_item">
                            <a :href="item.link">
                                <img :src="item.goodsMainPic" :alt="item.goodsName">
                            </a>
                            <div class="pro-infor">
                                <p class="pro-name">{{item.goodsName}}</p>
                                <p class="pro-price clear">
                                    <span class="fl now-price">{{item.salePrice}}</span>
                                    <span class="fr old-price">{{item.marketPrice}}</span>
                                </p>
                            </div>
                        </div>

                    </div>




                    <!--<div v-for="item,index in moreData" :index="index">-->
                    <!--<div v-for="item,index in item">-->
                    <!--<a :href="item.link">-->
                    <!--<img :src="item.goodsMainPic" :alt="item.goodsName">-->
                    <!--</a>-->
                    <!--<div class="pro-infor">-->
                    <!--<p class="pro-name">{{item.goodsName}}</p>-->
                    <!--<p class="pro-price clear">-->
                    <!--<span class="fl now-price">{{item.salePrice}}</span>-->
                    <!--<span class="fr old-price">{{item.marketPrice}}</span>-->
                    <!--</p>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->


                    <!--玩命加载中-->
                    <div class="loading-more" v-show="finish">
                        <img src="../assets/images/index/loading.gif" alt="">
                        <span>正在帮你加载更多药品</span>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeadNav from '@/components/HeadNav'
    import Footer from '@/components/footer'
    import MintUI from 'mint-ui'
    import 'mint-ui/lib/style.css'
    import { Swipe, SwipeItem } from 'mint-ui';

    import Vue from 'vue';
    Vue.use(MintUI)
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    import axios from 'axios';
    import qs from 'qs';
    import { Swiper, Slide } from 'vue-swiper-component';

    export default {
        name:'Index',
        data(){
            return{
                goodData:[],
                navData:[
                    {
                        srcUrl:require('../assets/images/index/nav-icon_01.png'),
                        text:'快速找药'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_02.png'),
                        text:'药师在线'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_03.png'),
                        text:'快速复购'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_04.png'),
                        text:'我的云开'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_05.png'),
                        text:'骨科用药'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_06.png'),
                        text:'男性用药'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_07.png'),
                        text:'肝胆用药'
                    },
                    {
                        srcUrl:require('../assets/images/index/nav-icon_08.png'),
                        text:'减肥用药'
                    }


                ],
                page:2,
                finish:true,
                searchValue:'',
                list: [
                    { img: 'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360' },
                    { img: 'https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360' },
                    { img: 'https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360' }
                ]
            }
        },
        created(){
            // alert(1)
        },
        mounted(){
           // alert(2)
            this.loadMorePor('/ajax-shop/default/search.ajax?operFlg=2',this,{rp:4,page:this.page});
            this.listView(this);
        },
        methods: {
            listView(obj) {
                let sw=true;
                // 注册scroll事件并监听
                window.addEventListener('scroll', function () {
                    // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
                    // console.log(document.body.scrollTop); // 滚动高度
                    // console.log(document.body.offsetHeight); // 文档高度
                    // 判断是否滚动到底部
//                    console.log(document.documentElement.scrollTop)
//                    console.log(document.body.scrollTop + window.innerHeight > document.body.offsetHeight)

                    if (document.body.scrollTop+window.innerHeight >= document.body.offsetHeight) {
                        if(sw){
                            sw = false;
                            obj.loadMorePor('/ajax-shop/default/search.ajax?operFlg=2',obj,{rp:4,page:obj.page});
                            sw=true;
                        }

                    }
                });
            },

            search(keywords) {
                //所以。实际上这个函数，相当于是在HeadNav被调用了的，调用的时候，还传递了一个值回来，也就是HeadNav的keywordData
                //HeadNav 发射事件 被index.vue 中的 HeadNav的@searchClick接收 -> 触发事件，调用search，相当于回调 并且带了一个回调值keywords
                // HeadNav -> this.$emit('searchClick',this.keywordsData);
                // debugger
                this.$router.push({path: 'search', query: {'keyword': keywords}})
            },
            loadMorePor(url,obj,param){
                console.log('子组件获取父组件的方法')
                axios.post(url, qs.stringify(param))
                    .then(function (response) {
                        let dataList=response.data.data.goodsData;
                        let totalPages = Math.ceil(response.data.data.count/4);
                        if(obj.page<=totalPages){
                            obj.goodData.push(dataList);
                            obj.page++;
                            obj.finish=true;
                            // console.log(obj.goodData)

                        }else{
                            obj.finish=false;
                        }
                    })
                    .catch(function (response) {
                        // console.log(1)
                    })
            }
        },

        components:{
            HeadNav,
            Footer,
            Swiper,
            Slide
        },
    }
</script>

<style>


</style>
