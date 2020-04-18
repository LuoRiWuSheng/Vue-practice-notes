<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写锁定打开" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="password" v-model="loginForm.password" placeholder="请输入密码" :type="passwordType" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handelLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px;" @click.native.prevent="handelLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username: admin</span>
          <span>Password: any</span>
        </div>
        <div class="tips">
          <span>Username: editor</span>
          <span>Password: any</span>
        </div>
        <el-button class="thirdparty-button" type="primary" @click="showDialog = true">Or connnet with</el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      本地无法模拟第三方登录,请结合自己的服务使用
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  components: {

  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      // 验证规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      // 提示框默认不出现
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler (route) {
        const query = route.query

        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },

  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd () {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'

      this.$nextTick(() => {
        // 手动调用聚焦，一定要在nextTick中调用，不然，在下一次UI更新之前，这个是没效果的
        this.$refs.password.focus()
      })
    },
    // 大写锁
    checkCapslock (e) {
      const { key } = e
      if (key === 'CapsLock' || (key.length === 1 && (key >= 'A' && key <= 'Z'))) {
        this.capsTooltip = true
      } else {
        this.capsTooltip = false
      }
    },
    handelLogin () {
      this.$refs['loginForm'].validate((valid) => {
        // 校验规则不通过
        if (!valid) return false

        // 校验规则通过
        this.loading = true
        // 调登录接口
        this.$store.dispatch('user/login', this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang='scss'>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

// css3样式， 如果浏览器支持 -webkit-mask 并且，又不支持caret-color属性，就是用下面的样式
@supports (-webkit-mask: none) and (not (caret-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

// 重设element-ui 样式
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%;
  min-height: 100%;
  background: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  // 提示消息
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  // 图标
  .svg-container {
    display: inline-block;
    width: 30px;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    color: $dark_gray;
  }

  // 标题
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: 700;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    // 禁止用户复制
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
