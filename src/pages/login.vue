
<template>
    <div>

        <div class="chenH-header">
            <a href="javascript: history.back();" class="backTo"></a>
            <span>登录</span>
        </div>

        <div class="login-quick" @click="changeLoginMethod">快捷登录</div>
        <div class="login-methods">
            <!--手机快捷登陆-->
            <div class="quick-login font26" v-if="!loginChangeBtn">
                <form id="login_form_1">
                    <label for="">
                        账号：<input type="text" name="mobile" v-model="tel_number" id="ebsig-mobile" placeholder="请输入手机号码">
                    </label>
                    <label for="" class="Code-box">
                        验证码：<input style="width:40%;" type="text" v-model="sms_yzm" maxlength="6" name="sms_yzm" id="sms-yzm" placeholder="请输入验证码">
                        <span class="getCode" id="get-sms-btn" onclick="sms.checkLogin('login_form_1', 'get-sms-btn');">点击获取验证码</span>
                    </label>
                </form>
                <div class="commonBtn" id="login_btn" login_type="1" @click="mobileLogin">登录</div>
                <!--合作账号登录-->
                <div class="cooperative">
                    <p>合作账号登录</p>
                    <div class="login-mode clear">
                        <a href="javascript: void(0);" onclick="authorize('qq');">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/qq.png" alt="">
                        </a>
                        <a href="javascript: void(0);" onclick="authorize('weibo');">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/weibo.png" alt="">
                        </a>
                        <a href="javascript: void(0);" onclick="authorize('mwxlogin');" style="display:none;">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/wx.png" alt="">
                        </a>
                    </div>
                </div>
            </div>

            <!--普通登陆-->
            <div class="common-login" v-if="loginChangeBtn">
                <form id="login_form_2">
                    <label for="">
                        账号：<input type="text" v-model="username" placeholder="请输入用户名/手机号码" name="username" id="username">
                    </label>
                    <label for="">
                        密码：<input style="width:75%;" v-model="password" type="password" placeholder="请输入至少六位数的密码" name="pwd" id="password">
                        <span class="visible-status"></span>
                    </label>
                </form>
                <div class="commonBtn" id="login_btn" login_type="2" @click="login_normal">登录</div>
                <!--快速注册找回密码-->
                <div class="login-nav clear">
                    <a href="register.html" class="fl">快速注册</a>
                    <a href="getPwd.html" class="fr">找回密码</a>
                </div>
                <!--合作账号登录-->
                <div class="cooperative" style="left:68%;">
                    <p>合作账号登录</p>
                    <div class="login-mode">
                        <a href="javascript: void(0);" onclick="authorize('qq');">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/qq.png" alt="">
                        </a>
                        <a href="javascript: void(0);" onclick="authorize('weibo');">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/weibo.png" alt="">
                        </a>
                        <a href="javascript: void(0);" onclick="authorize('mwxlogin');" style="display:none;">
                            <img src="http://www.ykyao.com/wap/theme/xth1/images/wx.png" alt="">
                        </a>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name:'Index',
        data(){
            return{
                loginChangeBtn:true,
                username:'',
                password:'',
//                默认手机动态登录
                login_type:1,

                cust_id:'',
//                正则是不是手机号格式
                reg_tel:/(^17\d{9}$)|(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g,
//                正则验证密码是不是字母和数字组成
                reg_password:/^(?![^a-zA-Z]+$)(?!\D+$)/,
                tel_number:'',
//                验证码初始为空
                sms_yzm:'',
//                短信验证码为数字，正则校验是否为数字
                reg_yzm:/^\d+$/,


            }
        },
        mounted(){
//
        },
        methods: {
//            切换登录方式
            changeLoginMethod(){
                this.loginChangeBtn=!this.loginChangeBtn
            },

            login(callback){
                let error_msg='';
                if (!this.username) {
                    error_msg +="用户名不能为空\n";
                }

                if (!this.password) {
                    error_msg +="密码不能为空\n";

                } else if ( this.password.length <6 || !(this.reg_password.test(this.password))) {

                    error_msg +="密码必须是6-30位字符,可使用字母、数字的组合\n";
                }

                if(error_msg){
                    alert(error_msg)
                    return false;
                }

                axios.post('/ajax-shop/default/login.ajax?operFlg=5',qs.stringify({username:this.username,pwd:this.password}))
                    .then((o)=> {
                        if ( o.data.code == 200 ) {

                            callback(o.data.data);
                            this.$router.push({name:'memberCenter'})
                        } else {
                            alert(o.data.message)
                        }
                    })

                    .catch(function () {
//                        console.log('请求失败')
                    })
            },

//            手机号和验证码登录
            mobileLogin(){

                let error_msg='';
                if (!this.tel_number) {
                    error_msg +="手机号码不能为空\n";

                } else if (!this.reg_tel.test(this.tel_number)) {
                    error_msg +="手机号码格式不正确\n";
                }


                if ( !this.sms_yzm) {
                    error_msg +="短信验证码不能为空\n";
                } else if ( !this.reg_yzm.test(this.sms_yzm) || this.sms_yzm.length !=6) {
                    error_msg +="短信验证码必须为6位数字\n";
                }

                if(error_msg){
                    alert(error_msg)
                    return false;
                }


                axios.post('/ajax-shop/default/login.ajax?operFlg=2',qs.stringify({}))
                    .then(function () {
                        if ( o.data.code == 200 ) {

                        } else {
                            alert(o.message)
                        }
                    })
            },

//            用户名和密码登录
            login_normal(){
               this.login((data)=>{
                   sessionStorage.setItem('userInfor',JSON.stringify(data))
                });
            }
        },
        components:{

        }
    }
</script>

<style>


</style>
