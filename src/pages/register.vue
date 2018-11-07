<template>
    <div>
        <div class="register">
            <form id="register_form" onsubmit="return false">
                <label for="">
                    账号：<input type="number" placeholder="请输入手机号码" v-model="tel_number" id="ebsig-mobile">
                </label>
                <label for="">
                    密码：<input type="password" placeholder="请输入六位数以上的密码" v-model="password" name="pwd" id="ebsig_pwd">
                    <span class="visible-status"></span>
                </label>
                <label for="" class="Code-box">
                    验证码：<input type="text" placeholder="请输入验证码" v-model="sms_yzm"
                                id="sms-yzm" maxlength="6">
                    <span :disabled="disabled" class="getCode" id="get-sms-btn" @click="checkRegister('register_form', 'get-sms-btn')">{{yzm_tips}}</span>
                </label>
            </form>
            <div class="register-btn commonBtn" id="register_btn" @click="register">注册</div>
        </div>
        <!--遮罩层-->
        <div class="shadow" v-if="yzm_tk" @click="tk_hide"></div>
        <!--验证码弹框-->
        <div class="verification-code" v-if="yzm_tk">
            <h3 style="text-align:center">图片验证码</h3>
            <button class="close" @click="tk_hide"></button>
            <div class="code-content">
                <div class="form-group">
                    <input class="form-control" placeholder="图片验证码" id="img-yzm"
                           v-model="yzm_value" v-focus="focusStatus"
                           type="text" maxlength="4"
                           autocomplete="off">
                    <img id="image-yzm-box" class="ml20" title="点击换图" :src="yzm_code_url" @click="captcha(4)">

                </div>

                <div id="yzm-error" v-if="yzm_error">{{yzm_error_message}}</div>

                <div class="btn-y" id="send-sms-btn" @click="yzm_sure">确定</div>
            </div>
        </div>

    </div>
</template>

<script>

    import MintUI from 'mint-ui'
    import 'mint-ui/lib/style.css'
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    import qs from 'qs';
    import Vue from 'vue';
    import layer from 'vue-layer'
    Vue.prototype.$layer = layer(Vue);

    export default {
        name:'Index',
        data(){
            return{
                refer_url:'',
                tel_number:'',
                password:'',
                reg:/^(?![^a-zA-Z]+$)(?!\D+$)/,
                sms_yzm:'',
                yzm_tk:false,
                yzm_value:'',
                yzm_tips:'点击获取验证码',
                yzm_error:false,
                yzm_error_message:'验证码错误',
//                验证码有效时间
                number:60,
                yzm_code_url:'http://www.yk.com/core/yzm.html',
                disabled:'',
                cookieDomain:'',
                focusStatus:true,

            }
        },
        mounted(){
         this.cookieDomain=location.host.substr(location.host.indexOf('.'))
//            alert(this.cookieDomain)
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        },
        methods: {

//            关闭弹框
            tk_hide(){
                this.yzm_tk=false;
            },
            yzm_sure(){
                if (!this.yzm_value) {
                    return false;
                } else if (this.yzm_value.length != 4) {
//                    $('#img-yzm').focus();
                    this.focusStatus=true;
                    this.yzm_error=true;
                    return false;
                }
                this.yzm_error_message='';
                this.send();
            },
            showTime(){
                if(this.number <= 0) {
                    this.yzm_tips='获取短信验证码'

                    this.number = 60;
                } else {
                    this.yzm_tips=this.number + '秒后可重发';
                    this.disabled='disabled'
                    this.number--;

                }
            },
            captcha(len){
                if (!len)
                    len = 4;
                    this.yzm_code_url="http://www.yk.com/core/yzm.html?len=" + len + "&code=" + Math.ceil(Math.random() * 10000);
            },
            send(){
                this.yzm_tk=true;
                if (this.reg.test(this.tel_number)) {
                    this.checkRegister()
                    return false;
                }

                if(!this.yzm_value){
                    alert('图片验证码不能为空')
                }else if(this.yzm_value.length<4){
                    this.yzm_error_message='验证码错误';
                    this.yzm_value='';
                    return false;
                }


                axios.get('/ajax-comm/base/sms.ajax?operFlg=1&mobile='+this.tel_number+'&yzm='+this.yzm_value+'&template=register',
                ).then((o)=>{
                    if ( o.data.data.code == 200 ) {
                        alert(o.data.data.message)
                        this.set_cookie(o.data.data.custID , o.data.data.mobile, o.data.data.points)
                        this.showTime();
                        this.yzm_tk=false;
                    } else {
                        if ( o.data.data.code == 1 ) {
                            this.captcha(4);
                            this.yzm_error_message=o.data.data.message;
                            this.yzm_value='';
                        } else {
                            alert(o.data.message)
                        }
                    }
                })
            },
            empty(val){
                switch (typeof(val)){
                    case "string":
                        return this.trim(val).length == 0 ? true : false;
                        break;
                    case "number":
                        return val == 0;
                        break;
                    case "object":
                        return val == null;
                        break;
                    case "array":
                        return val.length == 0;
                        break;
                    default:
                        return true;
                }
            },
            sendNew(mobile,btn_id){
                if (!E.isMobile(mobile)) {
                    return false;
                }
                this.btn_id = btn_id;
                E.ajax_get({
                    url: '/ajax-comm/base/sms.ajax?operFlg=3',
                    data: {
                        mobile: mobile,
                        template: 'register'
                    },
                    call: function( o ) {

                        if ( o.code == 200 ) {
                            layer.open({content: o.message, time: 2});

                            sms.showTime();
                        } else {
                            layer.closeAll();
                            layer.open({content:o.message,time:2});
                        }
                    }
                });
            },
            checkRegister(form_id,btn_id){

                let error_msg='';
                if (!this.tel_number) {
                    error_msg +="手机号码不能为空\n";

                } else if (!this.isMobile(this.tel_number)) {
                    error_msg +="手机号码格式不正确\n";

                }

                if (!this.password) {
                    error_msg +="密码不能为空\n";

                } else if ( this.password.length <6 || !(this.reg.test(this.password))) {

                    error_msg +="密码必须是6-30位字符,可使用字母、数字的组合\n";
                }




                if(error_msg){
                    alert(error_msg)
                    return false;
                }else{

                    var _this=this;
                    axios.post('/ajax-shop/default/login.ajax?operFlg=3',qs.stringify({mobile:this.tel_number}))
                        .then(function (o) {
                            if ( o.data.data.mobile == 1 ) {
                                alert('该手机号已经被使用')

                            }  else {
                                console.log(o)
                                _this.yzm_tk=true;
                            }
                        })
                        .catch(function (o) {
//                            console.log('请求失败')
                        })
                }
            },
            trim(s){
                return s.replace(/(^\s*)|(\s*$)/g, "");
            },
            setCookie(cookieName, cookieValue ,cookieTime, cookieDomain){
//                var exp = new Date();
//                exp.setTime(exp.getTime() + cookieTime * 1000);
//                if (cookieTime == 0)
//                    document.cookie = cookieName + "=" + encodeURI(cookieValue) + ";path=/;domain=" + cookieDomain + ";";
//                else
//                    document.cookie = cookieName + "=" + encodeURI(cookieValue) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + cookieDomain + ";";
//                return true;
            },
            set_cookie( cust_id, mobile, points ){
                this.setCookie("WANSONSHOP_IDENTIFIER", cust_id, 2592000, this.cookie_domain);
                this.setCookie("REMEMBER_USERNAME", cust_id, 2592000, this.cookie_domain);
                this.setCookie("WANSONSHOP_MOBILE", mobile, 2592000, this.cookie_domain);
                this.setCookie("WANSONSHOP_POINTS", points, 2592000, this.cookie_domain);
                this.cust_id = cust_id;
            },
            isMobile(s){
                var reg = /(^17\d{9}$)|(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
                return reg.exec(s);
            },
            getFormValues(id){
                var x = document.getElementById(id);
                var form_obj = {};
                var checkbox_name_array = {};
                for (var i = 0; i < x.length; i++) {
                    var ele = x.elements[i];
                    console.log(ele)
                    ele.name = this.trim(ele.name);
                    ele.value = this.trim(ele.value);
                    if (ele.name == "" || ele.name == undefined || ele.name == "undefined")
                        continue;
                    if (ele.type == "radio" && ele.checked == false)
                        continue;
                    if (ele.type == "checkbox") {
                        if (!checkbox_name_array[ele.name]) {
                            checkbox_name_array[ele.name] = 0;
                            form_obj[ele.name] = new Array();
                        }
                        if (ele.checked == false)
                            continue;
                        else {
                            var index = checkbox_name_array[ele.name];
                            form_obj[ele.name][index] = ele.value;
                            checkbox_name_array[ele.name] += 1;
                        }
                    } else {
                        ele.name_array = ele.name.split('[');
                        if (ele.name_array[1] != undefined && ele.name_array[1] == ']') {
                            if (ele.name_array[1] == ']') {

                                var ele_name = ele.name_array[0];
                                if (!checkbox_name_array[ele_name]) {
                                    checkbox_name_array[ele_name] = 0;
                                    form_obj[ele_name] = new Array();
                                }
                                var index = checkbox_name_array[ele_name];
                                form_obj[ele_name][index] = ele.value;
                                checkbox_name_array[ele_name] += 1;

                            } else {

                                var ele_name = ele.name_array[0];
                                var index = ele.name.substring(ele.name.indexOf('[')+1, ele.name.indexOf(']'));
                                if (!form_obj[ele_name]) {
                                    form_obj[ele_name] = {};
                                }
                                form_obj[ele_name][index] = ele.value;

                            }
                        } else {
                            form_obj[ele.name] = ele.value;
                        }

                    }

                }
                return form_obj;
            },
            register_common(form_id,call_back){
                let error_msg='';
                if (!this.tel_number) {
                    error_msg +="手机号码不能为空\n";

                } else if (!this.isMobile(this.tel_number)) {
                    error_msg +="手机号码格式不正确\n";

                }

                if (!this.password) {
                    error_msg +="密码不能为空\n";

                } else if ( this.password.length <6 || !(this.reg.test(this.password))) {

                    error_msg +="密码必须是6-30位字符,可使用字母、数字的组合\n";
                }


//                if (!this.sms_yzm) {
//                    error_msg +="短信验证码不能为空\n";
//                }

                axios.post('/ajax-shop/default/login.ajax?operFlg=4',
                        qs.stringify({mobile:this.tel_number,pwd:this.password,sms_yzm:this.sms_yzm})
                    )
                    .then((o)=>{
                        if ( o.data.code == 200 ) {
                            alert('注册成功')
                            this.set_cookie(o.data.custID , o.data.mobile, o.data.points);
                            call_back()
                        } else {
                            alert(o.data.message)
                        }
                    })

                    .catch(function () {
//                        console.log('请求失败')
                    })



            },
            register(){

               this.register_common('register_form',()=> {
//                   alert(111)
                   this.$router.push({name:'memberCenter'})
                });
            }
        },

        components:{

        }
    }

</script>

<style>


</style>
