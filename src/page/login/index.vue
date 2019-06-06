<template>
  <div class="login-container" @keyup.enter.native="handleLogin">
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">{{time}}</div>
        <img src="cdn/img/bg/logo.png" alt="" class="img">
        <p class="title">{{logoDesc || '通用管理后台'}}</p>
      </div>
      <div class="login-border">
    <div class="login-main">
        <h4 class="login-title">
          登录后台</h4>
          <UserLogin v-if="activeName==='user'"></UserLogin>
          <!-- <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin> --> 
        </div>
        <!-- <div class="login-menu">
          <a href="#"
            @click.stop="activeName='user'">账号密码</a>
          <a href="#"
            @click.stop="activeName='code'">手机号登录</a>
          <a href="#"
            @click.stop="activeName='third'">第三方登录</a>
        </div> -->
      </div>
    </div>
    <!-- <div class="login-spray">
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Provide, Mixins } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import BaseMixin from '@/mixins/BaseMixin'
import UserLogin from './userlogin.vue'

@Component({ components: { UserLogin } })
export default class LoginIndex extends Mixins(BaseMixin) {
    @Provide() public activeName: string = 'user'
    @Getter('logoDesc') private logoDesc: any
    private leftDesc: string = ''
    private time: string = ''

    protected mounted() {
      this.timeout()
    }

    private timeout() {
      this.time = this.$util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      this.$util.timeout(() => {
        this.time = this.$util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        this.timeout()
      }, 1000)
    }
}
</script>


<style lang="scss">
@-webkit-keyframes animate-cloud {
    0% {
        background-position:600px 100%
    }
    to {
        background-position:0 100%
    }
}
.login-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url($baseUrl + "cdn/img/bg/login.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    // background: url(http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg) 0 bottom repeat-x #049ec4;
    // -webkit-animation: animate-cloud 20s linear infinite;
    // animation: animate-cloud 20s linear infinite;
}
.login-spray {
    // width: 100%;
    background: url($baseUrl + "cdn/img/bg/spray.png") 0 bottom repeat-x #049ec4;
    // -webkit-animation: animate-cloud 20s linear infinite;
    // animation: animate-cloud 20s linear infinite;
}
.login-weaper {
  margin: 0 auto;
  width: 1000px;
  height: 500px;
  box-shadow: -4px 5px 10px rgba(0,0,0,.4);
}
.login-container::before {
  z-index: -1024;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url($baseUrl + "img/bg/login.png");
  background-size: cover;
}
.login-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #698CB0;
  color: #fff;
  width: 50%;
  float: left;
  position: relative;
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* display: -webkit-box; */
  display: -ms-flexbox;
  display: flex;
}
.login-left .img {
    width: 140px;
}
.login-left .login-time {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 100%;
    color: #fff;
    font-weight: 200;
    opacity: .9;
    font-size: 18px;
    overflow: hidden;
}
.login-left .title {
    margin-top: 60px;
    text-align: center;
    color: #fff;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 25px;
}
.login-info {
  padding-left: 140px;
}
.login-info-title {
  line-height: 90px;
  color: rgb(52, 58, 64);
}
.login-info-item {
  font-size: 14px;
  line-height: 2.5;
  color: rgb(33, 37, 41);
}
.login-border {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  background-color: #fff;
  width: 50%;
  float: left;
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
}
.login-main {
  margin: 0 auto;
  width: 65%;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}
.login-menu {
  width: 100%;
  text-align: center;
  a {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin: 0px 8px;
  }
}
.login-index {
  margin-top: 40px !important;
  width: 180px;
  height: 48px;
  text-align: center;
  border-radius: 50px !important;
  background: transparent !important;
  color: #333 !important;
  font-size: 16px !important;
  border: 1px solid rgb(152, 22, 244);
}
.login-submit {
  width: 100%;
  height: 45px;
  border: 1px solid #698CB0;
  background: none;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 300;
  color: #698CB0;
  cursor: pointer;
  margin-top: 30px;
  font-family: neo;
  -webkit-transition: .25s;
  transition: .25s;
}
.login-form {
  margin: 10px 0;
  i {
    color: #999;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      padding-bottom: 10px;
      text-indent: 5px;
      background: #fff !important;
      border: none;
      border-radius: 0;
      color: #333;
      border-bottom: 1px solid rgb(235, 237, 242);
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #698CB0;
    border-color: #698CB0;
    color: #fff;
}
</style>