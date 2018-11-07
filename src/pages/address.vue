<template>
  <div>
      <div class="address-manage-box" v-if="ifHasAddress && !isEdit">
          <ul class="address-list">
              <li v-for="item,index in addressList">
                  <div class="">
                      <p class="user-infor">
                          <span class="name">{{item.name}}</span>
                          <span class="tel">{{item.phone}}</span>
                      </p>
                      <p class="address">
                          <span>[ 默认地址 ]</span>
                          <span>{{item.province+item.city+item.county+item.add}}</span>
                      </p>
                      <div class="address-manage">
                          <span class="default-btn"
                                :class="{checked:item.default}"
                                @click="chooseDefault(item)"
                          >设为默认</span>
                          <div class="edit-box">
                              <a class="edits-address" @click="editAddress(index,item)">编辑</a>
                              <a class="del-address" @click="delAddressHanlder(item)">删除</a>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
      <!--添加新地址-->
      <div class="add-address" v-if="ifHasAddress && !isEdit" @click="addAress">
          添加新地址
      </div>
    <div class="edit-address" v-if="!ifHasAddress||isEdit">
        <form action="" id="address_form">
            <div class="user commp">
                <span>收货人</span>
                <input type="text" name="custName" id="custName" v-model="receive.name" placeholder="请输入收货人">
            </div>
            <div class="tel commp">
                <span>电话</span>
                <input type="text" name="mobile" id="mobile" v-model="receive.phone" placeholder="请输入手机号码">
            </div>
            <div class="location commp">
                <span>所在地区</span>

                <city-select v-model="cityInfo"></city-select>
            </div>
            <div class="location commp">
                <span>详细地址</span>
                <input type="text" id="address" name="address"  v-model="receive.add" placeholder="请输入您的详细地址">
            </div>
            <div class="set-default commp">
                <span>设为默认</span>
                <mt-switch v-model="receive.default" class="switch" style="width:180px;"></mt-switch>
            </div>
            <div class="save-address" @click="submitReceiveHandle()">保存</div>
        </form>
    </div>
      <footer-nav></footer-nav>
  </div>

</template>

<script>
    import CitySelect from './address2'
    import footerNav from '@/components/footer'
    import Vue from 'vue'
    export default {
        name: '',
        props: {},
        data () {
            return {
                receive: {
                    "name": "",
                    "phone": "",
                    "provinceId": 0,
                    "province": "",
                    "cityId": 0,
                    "city": "",
                    "countyId": 0,
                    "county": "",
                    "add": "",
                    "default": false,
                },
                cityInfo:'',
                // 是否编辑地址
                isEdit:false,
                // 被编辑的地址的index
                editAddressIndex:-1,
                addressList:this.$store.state.receiveInfo,
            }
        },
        computed:{
            ifHasAddress(){
                return this.$store.state.receiveInfo.length
            }
        },
        created() {
            this.addressList=this.$store.state.receiveInfo
        },
        methods: {
            submitReceiveHandle(){
                this.$store.commit('submitReceive',{receive:this.receive,index:this.editAddressIndex})
                this.$router.push({name:'checkOut'})
            },
            // 添加地址
            addAress(){
                this.isEdit=!this.isEdit
            },
            // 选择默认
            chooseDefault(item){
                this.$store.commit('chooseDafaultAddress',item)
                // console.log(Vue.prototype)
                // this.$toastc('设置成功')
            },
            // 编辑地址
            editAddress(index,item){
                this.isEdit=true
                this.receive=item;
                this.editAddressIndex=index;
            },
            // 删除地址
            delAddressHanlder(item){
                this.$store.commit('delAddress',item)
            }
            // onMyAddressChange(picker, values) {
            //     if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
            //         picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
            //         picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
            //         this.myAddressProvince = values[0];
            //         this.myAddressCity = values[1];
            //         this.myAddresscounty = values[2];
            //     }
            // },
        },
        mounted(){
            // this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
            //     this.myAddressSlots[0].defaultIndex = 0
            //     // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
            //     //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
            // });
        },
        components:{
            footerNav,
            CitySelect
        }
    }
</script>
