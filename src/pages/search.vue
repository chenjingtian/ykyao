<template>
    <div>
        <head-nav
            @searchClick="search"
        ></head-nav>
        <div class="filter-bar" v-if="show">
            <div class="filter-nav">
                <ul class="sort-tab">
                    <li class="disease-name"
                        :class="{'active':navActive==index}"
                        v-for="item,index in navData"
                        @click="toggleNav(index)"
                    >
                        <span class="text">{{item}}</span>

                        <span class="iconfont icon-xiala"></span>

                        <span class="iconfont icon-vertical_line"></span>
                    </li>

                </ul>
                <div class="filter" @click="fiter_show">
                    <span class="iconfont icon-shaixuan"></span>
                    <span>筛选</span>
                    <span class="iconfont icon-vertical_line"></span>
                </div>
                <div class="display-mode-shu" @click="changeArrange" :class="{'display-mode-heng':modeBtn}"></div>

            </div>
            <!--疾病名称排序-->

            <div class="dropList dropList1" v-if="tabIndex==0">
                <!--左边一级导航-->
                <div class="nav_left">
                    <ul>
                        <li class="cate-list-nav"
                            :class="{'active':index==ActiveIndex}"
                            v-for="item,index in searchList"
                            @click="changeNav(index)"
                        >{{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="nav_right">
                    <!--慢性病用药-->
                    <ul>
                        <li v-for="item,index in searchList[ActiveIndex].child.menuSecond">
                            <a href="">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!--&lt;!&ndash;综合排序&ndash;&gt;-->
            <div class="dropList dropList2" v-else-if="tabIndex==1">
                <ul class="sorts">
                    <a data-href="/wap/search-0-sale-asc-1.html?" :class="{active:1==1}">
                        <li class="checked">销量<span class="checked-icon"></span></li>
                    </a>

                    <a data-href="/wap/search-0-price-desc-1.html?">
                        <li>价格<span class="checked-icon"></span></li>
                    </a>

                    <a data-href="/wap/search-0-update-desc-1.html?">
                        <li>新品<span class="checked-icon"></span></li>
                    </a>
                </ul>
            </div>
            <!--筛选-->


        </div>
        <div class="screenfixed all-box" v-if="filter_show">
            <div class="screenfixed_inner">
                <!--厂家和品牌一级选择-->
                <div class="screen-one" v-show="!switch_list">
                    <!--清除和确定-->
                    <div class="brand_header">
                        <div class="clear_choice">
                            <span>清除</span>
                            <span class="iconfont icon-shaixuan"></span>
                            <!--<img class="clear-img" src="" alt="">-->
                        </div>
                        <span class="complete_choice" @click="selectComplete">确定</span>
                    </div>
                    <div class="choice_list">
                        <ul style="margin-bottom:1rem">
                            <!--按品牌-->
                            <li class="clear" @click="select_brand">
                                <span class="brand">品牌</span>
                                <span class="checked-text">{{brandName}}</span>
                                <span class="list_li_right iconfont icon-xiangyoujiantou"></span>
                            </li>
                            <!--按价格-->
                            <li class="clear">
                                <span class="brand">价格</span>
                                <span class="checked-text"></span>
                                <span class="list_li_right iconfont icon-xiangyoujiantou"></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--品牌-->
                <div class="fixed_switch_list" v-if="switch_list">
                    <div class="brand_header">
                        <span class="determine">确定</span>
                        <span class="brand_header_middle">品牌</span>
                    </div>
                    <div class="brand_list">
                        <ul>
                            <li class="conditions_brand"
                                v-for="item,index in brand_list"
                                :brand-id="item.brandId"
                                @click="chooseBrand(item)"
                            >
                                <a href="javascript:" >
                                    <span class="brand-name">{{item.brandName}}</span>
                                    <span class="iconfont icon-xuanze"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!--产品列表纵向布局-->
        <div class="recommend_pro" v-if="!arrangement">
            <ul id="goods_list">
                <pro-item :key="index" v-for="item,index in searchPro" :item="item"></pro-item>
            </ul>
        </div>
        <!--产品列表纵向布局-->
        <!--<div class="recommend_pro recommend_pro_heng" v-else>-->
        <!--<ul id="goods_list">-->
        <!--<pro-item :key="index" v-for="(item,index) in searchPro.data.list" tag="li" :item="item"></pro-item>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<p class="no-goods" v-if="!searchPro.data.list.length">暂时没有找到您所需要的商品~</p>-->
        <!--遮罩层-->
        <div class="shadow-box" v-if="shadowShow" @click="shadow_hide" :class="{'shadow-box_a':shadow_class}"></div>
        <footer-nav></footer-nav>
    </div>

</template>


<script>
    import Vue from 'vue'
    import HeadNav from '@/components/HeadNav'
    import FooterNav from '@/components/footer.vue'
    import ProItem from '@/components/item'
    import MintUI from 'mint-ui'
    import 'mint-ui/lib/style.css'
    import { Popup } from 'mint-ui';

    import axios from 'axios';
    import qs from 'qs';
    Vue.component(Popup.name, Popup);
    export default {
        data(){
            return{

                navData:['全部','综合排序'],
                navActive:null,
                searchList:[
                    {
                        name:'日常用药',
                        child: {
                            menuSecond: [
                                {
                                    name:'感冒咳嗽',
                                    link:'http://m.ykyao.com/wap/list-25178.html',
                                },
                                {
                                    name:'清热解毒',
                                    link:'http://m.ykyao.com/wap/list-25178.html',
                                }
                            ]
                        }
                    }
                ],
                tabIndex:null,
                ActiveIndex:0,
                shadowShow:false,
                switch_list:false,
                hide:true,
                searchPro:null,
                show:true,
                filter_show:false,
                brand_list:[
                    {
                        brandName:'全部',
                        brandId:0
                    },
                    {
                        brandName:'顺尔宁',
                        brandId:1
                    },
                    {
                        brandName:'念慈菴',
                        brandId:2
                    },
                ],
                arrangement:false,
                shadow_class:false,
//                选中的品牌
                brandName:'',
//                商品排列方式
                modeBtn:false,
//                请求商品的页数
                page:2
            }
        },
        methods:{
            search(keywords){
                // debugger
                this.$router.push({name: 'Search', params: {'keyword': keywords}})
                this.page++;
                this.loadPro()

            },
            loadPro(){
                axios.post('/ajax-shop/default/search.ajax?operFlg=1',qs.stringify({page:this.page,id:0,rp:10,keyword:'',sort:'desc',sortby:'sale',price:''}))
                    .then(o=>{
                        this.searchPro=o.data.data.list;
                    })
            },
            toggleNav(index){
                if(this.tabIndex==index){
                    this.tabIndex=null;
                    this.shadowShow=false
                    this.navActive=null;
                }else{
                    this.tabIndex=index;
                    this.shadowShow=true;
                    this.navActive=index;
                    if(this.tabIndex==2){
                        this.hide=false
                    }
                }
            },
            changeNav(index){
                this.ActiveIndex=index;
            },
            select_brand(){
                this.switch_list=true
            },
//            改变商品展示布局
            changeArrange(){
                this.arrangement=!this.arrangement;
                this.modeBtn=!this.modeBtn;
            },
//            关闭遮罩层
            shadow_hide(){
                this.shadowShow=false;
                this.tabIndex=null;
                this.navActive=null;
                this.filter_show=false;
                this.shadow_class=false;
                this.navActive=null;
            },
//            筛选的显示和隐藏
            fiter_show(){
                this.tabIndex=null;
                this.shadowShow=true;
                this.filter_show=true;
                this.shadow_class=true
            },
//            选择品牌
            chooseBrand(item){
                this.brandName=item.brandName;
                this.switch_list=false;
            },
//            选择品牌和价格以后确定
            selectComplete(){
                this.shadowShow=false;
                this.filter_show=false;
                this.shadow_class=false;
                this.navActive=null;
            },

        },
        components:{
            HeadNav,
            ProItem,
            FooterNav
        },

        mounted(){
            this.loadPro()
        },
        // beforeRouteEnter(to,from,next){
        //     console.log(to.params.keyword)
        //     next()
        // }

    }
</script>