import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'qs';
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        // 购物车数据
        carPanelData:JSON.parse(window.localStorage.getItem("carPanelDatas")) ||{
            groupList: {

            },
            goodsList: {

            },
            tCount:0,
            btn:true

        },
        // carPanelData: JSON.parse(window.localStorage.getItem("carPanelDatas"))|| {
        //     groupList: {},
        //     goodsList: {}
        // },
        // 收货地址
        receiveInfo: JSON.parse(window.localStorage.getItem('addressList')) || []

    },
    getters: {
        // 结算页面收货地址
        addressInfor(state){
            return state.receiveInfo.filter(item=>item.default)[0] || state.receiveInfo[0]
        },

        // 购物车商品全部选中

        allChecked(state){
            let allChecked=true;
            for(let key in state.carPanelData.groupList){
                if(!state.carPanelData.groupList[key].checked){
                    allChecked=false;
                }

            }

            for(let key in state.carPanelData.goodsList){
                if(!state.carPanelData.goodsList[key].checked){
                    allChecked=false;
                }
            }

            return allChecked
        }
    },
    mutations: {
        // 往购物车里面添加商品
        // addCarPanelData(state,data){
        //     // 判断state.carPanelData为不为空
        //     let off=true;
        //     state.carPanelData.forEach((goods)=>{
        //         if(goods.goodsID==data[0].goodsID){
        //             if(data[2]>0){
        //                 goods.count+=data[1];
        //                 if(goods.count>goods.limit_num){
        //                     goods.count -= data[1];
        //                 }
        //                 state.cartNum+=data[1]
        //             }else{
        //                 if(goods.count>1){
        //                     goods.count-=data[1];
        //                 }
        //                 state.cartNum-=data[1]
        //             }
        //             goods.goodsMainPic = data[0].goodsMainPic;
        //             off=false;
        //         }
        //     })
        //     if(off){
        //         let goodsData = data[0]
        //         Vue.set(goodsData,'count',data[1])
        //         Vue.set(goodsData,'checked',true);
        //         goodsData.goodsMainPic = data[0].goodsMainPic;
        //         state.carPanelData.push(goodsData);
        //         state.cartNum+=data[1]
        //     }
        //
        //
        // },
        // // 选中取消商品
        checkGoods(state,{item,kind,id}){
            alert(item.checked)
            item.checked=!item.checked
            // for(let key in state.carPanelData[kind]){
            //     if(key==id) {
            //         alert(item.checked)
            //        state.carPanelData[kind][key].checked=!item.checked
            //     }
            // }

            store.commit('updateCarPanelData')
            console.log(state.carPanelData)
            console.log(111)
        },
        // // 删除单个商品
        delPanlData(state,{item,id,isGroup}){
            if(isGroup){
                for(let key in state.carPanelData.groupList){
                    if(key==id){
                        delete state.carPanelData.groupList[key];
                        state.carPanelData.tCount-=item.chenCount
                    }
                }
            }else{
                for(let key in state.carPanelData.goodsList){
                    if(key==id){
                        // alert(1)
                        delete state.carPanelData.goodsList[key];
                        state.carPanelData.tCount-=item.chenCount
                    }
                }
            }

            store.commit('updateCarPanelData',state.carPanelData)

        },
        // // 删除选中的商品
        delCheckedPro(state){
            // console.log(state.carPanelData)
            for(let key in state.carPanelData.groupList){
                if(state.carPanelData.groupList[key].checked){
                    alert(1)
                    state.carPanelData.tCount-=state.carPanelData.groupList[key].chenCount
                    delete state.carPanelData.groupList[key]

                }
            }
            for(let key in state.carPanelData.goodsList){
                if(state.carPanelData.goodsList[key].checked){
                    alert(2)
                    state.carPanelData.tCount-=state.carPanelData.goodsList[key].chenCount
                    delete state.carPanelData.goodsList[key]
                }
            }

           store.commit('updateCarPanelData')
        },
        // // 全选
        // allGoodsCheck(state,checked){
        //     if(checked){
        //         state.carPanelData.forEach(item=>{
        //             item.checked=false;
        //         })
        //     }else{
        //         state.carPanelData.forEach(item=>{
        //             item.checked=true
        //         })
        //     }
        // },
        // 提交用户地址
        submitReceive(state, {receive,index}) {
            // 如果是编辑地址点击保存
            if(index>=0){
                if(state.receiveInfo.length){
                   state.receiveInfo[index]=receive
                }
            }else{
                // 如果选中默认，就把其他地址default设置成false，
                // 并且把当前的地址push进数组
                if (receive.default) {
                    state.receiveInfo.forEach((item, index) => {
                        item.default = false;
                    })
                    receive.default=true;
                    state.receiveInfo.push(receive)
                } else {
                    // 如果没有选择默认且地址数组里面的每一项默认值都是false，
                    // 就把新地址放在地址数组第一项，否则就push进数组
                    if(state.receiveInfo.every(item=>!item.default)){
                        state.receiveInfo.unshift(receive)
                    }else{
                        state.receiveInfo.push(receive)
                    }
                }
            }

            store.commit('updateReceiveInfo',state.receiveInfo)

            // window.localStorage.setItem('addressList', JSON.stringify(state.receiveInfo))
        },
        // 设置默认地址
        chooseDafaultAddress(state,item) {
            state.receiveInfo.forEach(item=>item.default=!item.default)
            item.default=!!item.default;
            store.commit('updateReceiveInfo',state.receiveInfo)
        },
        // 删除地址
        delAddress(state,item){
            state.receiveInfo.splice(item,1)
            store.commit('updateReceiveInfo',state.receiveInfo)
        },
        updateReceiveInfo(state,data){
            window.localStorage.setItem('addressList',JSON.stringify(data))
        },

        // updateCarPanelCount(state,item){
        //     window.localStorage.setItem('carPanelData', JSON.stringify(pro));
        // },

        updateCarPanelData(state,pro) {
            window.localStorage.setItem('carPanelDatas', JSON.stringify(pro));
        },
        // 添加商品到购物车
        addGoodsToCart(state) {

        },
        // 获取购物车数据
        getCartData(state, data) {
            state.carPanelData = data;
        },
        // 改变购物车数量
        changeProNumber(state,{way,item}){
            let pro=state.carPanelData;
            if(way>0){
                item.chenCount++
                pro.tCount++
            }else{
                if(item.chenCount>1){
                    item.chenCount--
                    pro.tCount--
                }
            }
            store.commit('updateCarPanelData',pro)
        }
    },
    actions: {
        addCarPanelData(context, {data, specifiIndex, totalCount}) {
            const group=data.hasOwnProperty("specifi") ? data.specifi[specifiIndex] : null;
            const cartPro = data.hasOwnProperty("specifi") ? data.specifi[specifiIndex] : data;

            //此处存放的是详情页传递出来的数据集
            const detailData = {
                postID: data.goodsID,
                groupID: cartPro && cartPro.dataGroup,
                ProCount: parseInt(totalCount)|| 0,
            };
            const submitCar = (type) => {
                const addCarApi = {
                    goods: {
                        url: "/ajax-shop/default/cart.ajax?operFlg=2", params: qs.stringify({
                            postID: detailData.postID,
                            goods_amount: detailData.ProCount
                        })
                    },
                    goodsWithGroup: {
                        url: "/ajax-shop/default/cart.ajax?operFlg=103", params: qs.stringify({
                            groupID: detailData.groupID,
                            group_amount: detailData.ProCount
                        })
                    }
                };
                const api = addCarApi[type]
                return axios.post(api.url, api.params);
            };

            submitCar(group ? "goodsWithGroup" : "goods").then(result => {
                const {postID, ProCount} = detailData;
                const goods = data;
                const pro =context.state.carPanelData
                if(!cartPro.chenCount){
                    cartPro.chenCount = 0
                }
                cartPro.chenCount += ProCount
                cartPro.checked=true

                // if (pro.btn) {
                //     cartPro.chenCount = 0
                // }else{
                //   if(group){
                //       cartPro.chenCount = pro.groupList[data.specifi[specifiIndex].dataGroup].chenCount
                //   }else{
                //       cartPro.chenCount = pro.goodsList.postID.chenCount
                //   }
                //
                //
                // }

                if (group) {
                    cartPro.group_name = cartPro.proName;
                    cartPro.goodsID = cartPro.dataGroup;
                    cartPro.goods = {
                        [postID]: {
                            goodsName: goods.goodsName,
                            img_link: goods.goodsMainPic,
                            is_buy: 1,
                            link: goods.link,
                            salePrice: goods.salePrice,
                            marketPrice: goods.marketPrice
                        }
                    }
                }

                if (group) {
                    pro.groupList[group.dataGroup] = cartPro
                } else {
                    pro.goodsList[postID] = cartPro
                }
                pro.tCount+=ProCount
                // console.log(pro)
                context.commit('updateCarPanelData', pro);
            })
        },
        // 获取购物车商品数量

        // // if 就是你mutation里的事件操作
        // // 获取购物车数据
        cartInfor(context) {
            axios.get('/ajax-shop/default/cart.ajax?operFlg=6')
                .then((o) => {
                    context.commit('getCartData', o.data.data)
                })
        },

    }
})

export default store