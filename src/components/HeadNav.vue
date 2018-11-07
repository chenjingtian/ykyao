<template>
  <div class="index-header">
    <div class="app-logo">
      <img src="../assets/images/logo.png" alt="" @click="getP">
    </div>
    <div class="search-medicine">

      <input id="search_input" v-model="keywordsData" class="form-control"
             placeholder="请输入商品名称、品牌" type="search">
      <button id="search_btn" class="searchButton" @click="searchClickHandler($event)">搜索</button>
    </div>

  </div>
</template>

<script>
  import '../assets/css/headNav.scss'

  export default {
    name: 'HeadNav',
    data() {
        return {
            keywordsData:this.$router.currentRoute.query.keyword
        }
    },

    methods: {
      searchClickHandler(e) {
          //这里是组件自身的点击事件
          //目的是为了发射一个事件出去到父组件
          //发射的事件内容就是传递查询text中的内容⤵⤵️
        this.$emit('searchClick',this.keywordsData);
        e.preventDefault();
      },
        getP(){
          alert(this.$parent.loadMorePor())
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
