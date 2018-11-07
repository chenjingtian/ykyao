<template>
    <div>

        <div v-show="orderListInfor && payShow">
            <toastCh>
                <!--<div> 哇，原来是这样呀</div>-->
                <div class="payMethod_box">
                    <div class="title">
                        <h3>支付方式</h3>
                        <button class="close"></button>
                    </div>
                    <div class="coupons">
                        <ul>
                            <li v-for="item,index in orderListInfor.pay" @click="choosePay(index,item)">
                                <span class="send-l " id="pay-name1">{{item.payTypeName}}</span>
                                <span class="send-r check-btn" :class="{checked:index==payIndex}" id="pay-1"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </toastCh>
        </div>


        <div class="address-box">
            <!--没有地址-->
            <router-link
                :to="{name:'address'}"
                class="no-address"
                 v-if="addressLength<1"

            >
                请先添加收货地址
            </router-link>
            <!--有地址-->
            <div id="addr-box" v-else>
                <router-link :to="{name:'address'}">
                    <p class="consignee">
                        <span>{{receiveInfo.name}}</span>
                        <span>{{receiveInfo.phone}}</span>
                    </p>
                    <p class="consignee-dres">
                        <i></i>
                        <span class="address">{{receiveInfo.province+receiveInfo.county+receiveInfo.add}}</span>
                        <span class="arrow-right"></span>
                    </p>
                </router-link>

            </div>
        </div>
        <!--商品列表-->
        <div class="pro-list-box" v-show="false">
            <div class="pro-list">
                <ul>
                    <li v-for="goods,index in proList">
                        <img :src="goods.goodsMainPic" alt="">
                    </li>
                </ul>
            </div>
            <!--共几件商品-->
            <div class="all-pro" v-if="false">
                 共{{proLength}}件商品
            </div>
        </div>
        <div class="methods">
            <!--配送方式-->
            <div class="send-type common-h p30" @click="sendTypeToggle">
                <span>配送方式</span>
                <span v-if="sendChecked">{{sendBtn?sendChecked.sendTypeName:sendTypeName}}</span>
            </div>
            <div class="send-box" v-if="orderListInfor" v-show="sendTypeBtn">
                <ul class="p30">
                    <li v-for="item,index in orderListInfor.send" @click="chooseSendType(index,item)">
                        <span class="send-l">{{item.sendTypeName}}</span>
                        <span class="send-m red">{{item.freight}}</span>
                        <span class="send-r" :class="{checked:sendSelectedBtn?item.selected:index==selectedSendTypeIndex}"></span>
                    </li>
                </ul>
            </div>
            <!--支付方式-->
            <div class="common-h p30" @click="showPayBox">
                <span>支付方式</span>
                <span v-if="paySeleted">{{payTypeName}}</span>
            </div>



            <!--&lt;!&ndash;优惠券&ndash;&gt;-->
            <!--<div class="common-h p30">-->
                <!--<a href="javascript:" onclick="coupon.list.open(1);">-->
                    <!--<span class="common-title">优惠券</span>-->
                    <!--<span class="value-name" id="coupon-name">我的优惠券</span>-->
                <!--</a>-->
            <!--</div>-->
            <!--&lt;!&ndash;发票信息&ndash;&gt;-->
            <!--<div class="common-h p30">-->
                <!--<a href="">-->
                    <!--<p>-->
                        <!--<span class="common-title">发票信息</span>-->
                        <!--<span class="value-name" id="invoice_title">不开发票</span>-->
                    <!--</p>-->
                <!--</a>-->
            <!--</div>-->
            <!--&lt;!&ndash;订单备注&ndash;&gt;-->
            <!--<div class="common-h p30">-->
                <!--<p>订单备注</p>-->
                <!--<p>提示：请勿填写有关支付、收货、发票方面的信息</p>-->
                <!--<textarea name="remark" id="remark" cols="30" rows="10" maxlength="45" placeholder="限45个字"></textarea>-->
            <!--</div>-->
        </div>

    </div>

</template>

<script>

    import axios from 'axios'
    import qs from 'qs';
    export default {
        data(){
            return{
                // 收货地址
                receiveInfo:this.$store.getters.addressInfor,
                // 购买商品send-box
                proList:this.$store.state.carPanelData||[],
                // 有没有地址
                addressLength:this.$store.state.receiveInfo.length,
                // 购买商品数量
                proLength:this.$store.state.carPanelData.length,
                sendBtn:true,
                sendSelectedBtn:true,
                // 选中的配送方式
                sendTypeName:'',
                // 配送方式隐藏展示,
                // 配送方式选择
                selectedSendTypeIndex:-1,
                sendTypeBtn:false,
                // 选中的支付方式
                payTypeName:'',
                payIndex:-1,
                payBtn:false,
                // 订单信息
                orderListInfor:null,
                // 发票id
                invoiceID:'',
                btnC:false,
                payShow:false,
            }
        },
        methods:{
            // 配送方式创建
            sendCreate(){
                axios.get('/ajax-shop/default/checkout.ajax?operFlg=1&act=shop_cart&subsite=wap')
                    .then((o)=>{
                        this.orderListInfor=o.data.data;
                    })
            },

            // 配送方式显示隐藏
            sendTypeToggle(){
                this.sendTypeBtn=!this.sendTypeBtn
            },
            // 选择配送方式
            chooseSendType(index,item){
                this.sendBtn=false;
                this.sendSelectedBtn=false;
                alert(this.sendBtn)
                this.sendTypeName=item.sendTypeName;

                let send_region_id=item.send_region_id
                this.selectedSendTypeIndex=index
                axios.get("/ajax-shop/default/checkout.ajax?operFlg=2&send_region_id="+send_region_id+"&act=shop_cart")
                    .then((o)=>{
                        console.log(o)
                    })
            },

            // 显示付款方式弹框
            showPayBox(){
                // this.payBtn=true
                this.$nextTick(()=>{
                    this.payShow=true
                })
            },
            // 选中支付方式
            choosePay(index,item){
                alert(1)
                console.log(1)
                console.log(item)
                this.payTypeName=item.payTypeName;
                this.payIndex=index

            }
        },
        computed:{
            // 被选中的配送方式
            sendChecked(){
                if(this.orderListInfor){
                    for(let key in this.orderListInfor.send){
                        if(this.orderListInfor.send[key].selected){
                            return this.orderListInfor.send[key]
                        }
                    }
                }
            },


            // 被选中的支付方式
            paySeleted(){
                if(this.orderListInfor){
                    console.log(this.orderListInfor.pay)
                    for(let key in this.orderListInfor.pay){
                        if(this.orderListInfor.pay[key].selected){
                            return this.orderListInfor.pay[key]
                        }
                    }
                }
            },
            // invoiceSeleted(){
            //     if(this.orderListInfor){
            //         for(let key in this.orderListInfor.invoice){
            //             if(this.orderListInfor.invoice[key].invoiceID==){
            //                 return this.orderListInfor.invoice[key]
            //             }
            //         }
            //     }
            // }
        },
        mounted(){
            this.sendCreate()
            // this.$once(this.sendCreate(),()=>{
            //     console.log(this.sendBtn)
            //     this.sendBtn=false;
            //     alert(this.sendBtn)
            //     this.sendSelectedBtn=false;
            // })
        },

    }
</script>
