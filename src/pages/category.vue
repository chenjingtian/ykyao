
<template>
    <div>
        <form action="" class="m_search">
            <div class="m_search_box">
                <div class="search_text">
                    <input type="search" class="font26 ui-autocomplete-input"
                           id="search_input"
                           value=""
                           placeholder="请输入商品名称、品牌"
                           autocomplete="off"

                    >
                </div>
                <div id="search_btnParent" class="search_button">搜索</div>
            </div>
        </form>
        <div class="cate-list">
            <div class="cate-list-nav">
                <a href="javascript:;"
                   v-for="item,index in cateNav"
                   :data-id="item.dataId"
                   :class="{active:activeIndex==index}"
                   @click="cateClick(item,index)"
                >
                    {{item.text}}</a>
            </div>

            <div class="categoryList">
                <li class="pro-box" v-if="cateList['key'+bigCategoryID].length>0" v-for="item,index in cateList['key'+bigCategoryID]" :key="item">
                    <a :href="item.wap_link">
                        <img :src="domain+item.icoPic" :alt="alt">
                        <p>{{item.name}}</p>
                    </a>
                </li>
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>

</template>

<script>
    import FooterNav from '@/components/footer'
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name:'Index',
        data(){
            return{
               domain:'http://www.ykyao.com',
               cateNav:[
                   {
                       text: '日常用药',
                       dataId:'25',
                   },
                   {
                       text: '医疗器械',
                       dataId:'18',
                   },
               ],
                cateList:{},
                bigCategoryID:'25',
                activeIndex:0

            }
        },

        mounted(){
            this.getCatePro();
        },
        methods: {

            getCatePro(){
                if(this.cateList['key'+this.bigCategoryID]){
                    return false;
                }else{
                    this.ajaxPro();
                }
            },
            ajaxPro(){
                axios.get('/ajax-shop/default/category.ajax?operFlg=2&bigCategoryID='+this.bigCategoryID)
                    .then((response)=>{
                        this.$set(this.cateList,'key'+this.bigCategoryID,response.data.data.midCategory)
                        console.log(this.cateList)
                    })
            },
            cateClick(item,index){
                this.activeIndex=index;
                this.bigCategoryID=item.dataId
                this.getCatePro()
            }
        },
        components:{
            FooterNav
        }
    }
</script>

<style>


</style>
