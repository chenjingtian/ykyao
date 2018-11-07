<template>
  <div class="box">
      <input type="text" class="input-w"
             v-model="value"
             @blur="verification"

      >
      <ul>
          <li v-for="item,index in dataList"
              :class="{active:activeIndex===index}"
              @click="chooseAmount(item,index)"

          >
                {{item}}元
          </li>
      </ul>
      <p class="tips">为防止洗钱和套现，单笔充值金额需消费30%后才可提现</p>
      <p class="recharge">微信支付</p>
      <p class="recharge">支付宝支付</p>
  </div>

</template>

<script>
    import { Picker } from 'mint-ui';
    import myaddress from '@/assets/js/address.json' //引入省市区数据
    export default {
        data(){
            return {
                dataList:[
                    '20',
                    '50',
                    '100',
                    '200',
                    '500',
                    '1000',
                ],
                value:'50',
                activeIndex:1
            }
        },
        props:{
            min:{
                type:Number,
                default:10
            },
            max:{
                type:Number,
                default:1000
            }
        },
        methods:{
            chooseAmount(val,i){
                this.activeIndex=i;
                this.value=val
            },
            verification(){
                if(typeof this.value==='string'){
                    this.value=this.value.replace(/\D/g,'')
                }
                if(Number(this.value)<this.min){
                    this.value=this.min
                }else if(this.value>this.max){
                    this.value=this.max
                }
                   if(this.dataList.includes(this.value)){
                       this.dataList.forEach((item,index)=>{
                           if(item===this.value){
                              this.activeIndex=index
                           }
                       })
                   }else{
                       this.activeIndex='';
                   }
            }
        }
    }
</script>
