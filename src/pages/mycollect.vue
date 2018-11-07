<template>
    <div>
        <div class="collection-title font30">
            <span class="all-collection">全部收藏 (<i id="all_num">{{collectionNumber}}</i>)</span>
            <a href="" class="search-pro"></a>
        </div>

        <div class="prolist">
            <div class="pro_box" v-for="items,index in proList">
                <dl v-for="item,index in items">
                    <dt>
                        <a :href="item.wap_link">
                            <img :src="'http://www.ykyao.com/'+item.goodsMainPic">
                        </a>
                    </dt>
                    <dd>
                        <a :href="item.wap_link">
                            <p class="pro-name">{{item.goodsName}}</p>
                            <p class="pro-ad"></p>
                        </a>
                        <div class="pro-infor">
                            <span class="price">{{item.salePrice}}</span>
                            <span class="del-collect"></span>
                            <span class="add-cart"></span>
                        </div>
                    </dd>
                </dl>
            </div>
            <div id="loading-more"></div>
        </div>

    </div>
</template>

<script>

    import axios from 'axios';
    import qs from 'qs';

    export default {

        data(){
            return{
                proList:[],
                collectionNumber:0,
                page:1,
                rp:5

            }
        },
        mounted(){
            this.loadPro();
            this.getCollection(this)
        },
        methods: {
            getCollection(obj){
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
                            obj.loadPro();
                            sw=true;
                        }

                    }
                });
            },
            loadPro(){

                axios.post('/ajax-shop/default/custCollect.ajax?operFlg=1',qs.stringify({rp:this.rp,page:this.page}))
                    .then((response)=>{
                        let dataList=response.data.data.collection;
                        let totalPages = Math.ceil(response.data.data.count/4);
                        this.collectionNumber=response.data.data.count;
                        if(this.page<=totalPages){
                            this.proList.push(dataList);
                            this.page++;
                            this.collection=dataList
                        }else{
                        }
                    })

                    .catch(function (response) {
//                        console.log(1)
                    })
            }
        },
        components:{
        },


    }
</script>

<style>


</style>
