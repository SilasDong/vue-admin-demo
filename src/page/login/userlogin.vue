<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="account">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix"
               class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else />
            <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i>
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <el-form-item>
      <el-button type="primary"
                 @click.native.prevent="handleLogin"
                 class="login-submit" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Provide, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/mixins/BaseMixin'
import { Getter, Action } from 'vuex-class'

@Component
export default class UserLogin extends Mixins(BaseMixin) {
      @Getter('tagWel') private tagWel: any
      @Getter('hasResponse') private hasResponse: any
      @Action('LoginByUsername') private actionLoginByUsername: any
      private loginForm = {
        account: '',
        password: '',
        code: '',
        redomStr: ''
      }
      private loginRules = {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator:  this.validateCode},
        ]
      }

      private code = {
        src: '',
        value: '',
        len: 4,
        type: 'img'
      }

      private conut = 2

      private checked = false

      private passwordType = 'password'
      private loading = false

      protected created() {
        this.getCode()
      }

      protected getCode() {
        if (this.hasResponse === 1 || this.conut <= 0) {
          this.code.src = `/api/xcd-module-sys-kaptcha?${new Date().getTime()}`
          return
        }
        this.$util.timeout(() => {
          this.conut--
          this.getCode()
        }, 500)
      }

      private showPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text'
      }
      private refreshCode() {
          this.code.src = `${this.code.src}?${new Date().getTime()}`
      }

      private handleLogin(): void {
        this.$refs.loginForm.validate((valid: boolean) => {
          if (valid) {
            this.loading = true
            this.actionLoginByUsername(this.loginForm).then(() => {
              this.$router.push({ path: this.tagWel.value })
            }).catch(() => {
              this.loading = false
              this.refreshCode()
            })
          }
        })
      }

      private validateCode(rule: any, value: any, callback: any) {
        if (!value || value.length !== this.code.len) {
          this.loginForm.code = ''
          this.refreshCode()
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
    }
}
</script>
