<template>
    <div class="page">
        <div class="login-box">
            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-position='left' label-width='0px' class='demo-ruleForm login-container' status-icon>
                <h3 class='title'>系统登录</h3>

                <!-- prop是最表单验证用的，就是为了获取到相关的值 -->
                <el-form-item prop='account'>
                    <!-- autocomplete 自定补全（原生属性） -->
                    <el-input type='text' v-model='ruleForm.account' autocomplete='off' placeholder='帐号' id='loginEmail'></el-input>
                </el-form-item>

                <el-form-item prop='checkPass' style='margin-bottom: 0'>
                    <el-input type='password' v-model='ruleForm.checkPass' auto-complete='off' placeholder='密码' id='loginPassword'></el-input>
                </el-form-item>

                <el-form-item>
                    <label  id='showPasswordToggle'>
                        <el-checkbox v-model='checked' id='showPasswordChecked'>显示密码</el-checkbox>
                    </label>
                    <router-link to='/' style='float: right; color: #bbb'>忘记密码?</router-link>
                </el-form-item>

                <el-form-item style="width: 100%">
                    <el-button type='primary' style='width: 100%' @click.native.prevent='handleSubmit' :loading='logining'>
                        登录
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <router-link to='/register'>
                        <el-button style='width: 100%'>
                            注册
                        </el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import sha256 from 'crypto-js/sha256'
import {requestLogin} from '@/api/user'

// vue验证规则，参见 https://github.com/yiminghe/async-validator
export default {
    name: 'app-login',
    data () {
        return {
            logining: false,
            fromUrl: '/',
            ruleForm: {
                account: 'admin',
                checkPass: '123456'
            },
            rules: {
                account: [
                    {required: true, message: '请输入帐号', trigger: 'blur'}
                ],
                checkPass: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit (ev) {
            // 验证
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.logining = true
                    const loginParams = {
                        username: this.ruleForm.account,
                        password: sha256(this.ruleForm.checkPass)
                    }

                    requestLogin(loginParams).then(data => {
                        this.logining = false
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        })
                        console.log('登录中的地址-->', this.fromUrl)
                        this.$router.push(this.fromUrl)
                    })
                } else {
                    console.log('error submit 登录失败')
                    return false
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        // 进入页面，对路由进行判断，如果不是注册的路由，就将当前路由注入到
        next(vm => {
            if (from.fullPath !== '/register' && !from.meta.errorPage) {
                vm.fromUrl = from.fullPath
            }
        })
    }
}
</script>

<style scoped>
    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .page {
        background-color: #eff3f4;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }

    .login-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 400px;
        background-color: #FFF;
        padding: 2.25em;
        box-sizing: border-box;
        border: solid 1px #DDD;
        border-radius: .5em;
        font-family: 'Source Sans Pro', sans-serif;
    }
</style>
