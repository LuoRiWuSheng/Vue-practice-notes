<template>
    <div class='page'>
        <div class='login-box'>
            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-position='left' label-width='0' class='demo-ruleForm login-container' status-icon>
                <h3 class='title'>注册</h3>

                <el-form-item prop='account'>
                    <el-input type='text' v-model='ruleForm.account' auto-complete='off' placeholder='帐号' id='loginEmail'></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input type='password' v-model='ruleForm.password' auto-complete='off' placeholder='密码' id='loginPassword'></el-input>
                </el-form-item>
                <el-form-item prop='checkPass'>
                    <el-input type='password' v-model='ruleForm.checkPass' auto-complete='off' placeholder='重复密码' id='loginCheckPass'></el-input>
                </el-form-item>
                <el-form-item style='width: 100%'>
                    <el-button type='primary' style='width: 100%' @click.native.prevent='handleSubmit' :loading='logining'>注册</el-button>
                </el-form-item>

                <el-form-item style='width: 100%'>
                    <router-link to='/login'>
                        <el-button style='width: 100%'>
                            登录
                        </el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
import { requestRegister } from '@/api/user'

export default {
    name: 'app-register',
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }

                callback()
            }
        }

        let validatePass2 = (rule, value, callback) => {
            // 这个就是规则，是下面的rule中传上来的，但是也用不上
            // console.log(rule)
            // console.log('-------------')
            // 主要关注用户输入是什么，这个是重点
            // console.log(value)
            // console.log('-------------')
            // console.log(callback)
            if (value === '') {
                callback(new Error('再次输入密码'))
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }

        return {
            logining: false,
            ruleForm: {
                account: '',
                password: '',
                checkPass: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入帐号', trigger: 'blur' }
                ],
                password: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }]
            }
        }
    },
    methods: {
        handleSubmit (ev) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.logining = true
                    let registerParams = {
                        username: this.ruleForm.account,
                        password: this.ruleForm.password,
                        checkPass: this.ruleForm.checkPass
                    }

                    requestRegister(registerParams).then(data => {
                        this.logining = false

                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        })

                        this.$router.push({ path: '/login' })
                    })
                } else {
                    console.log('注册失败')
                    return false
                }
            })
        }
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
        font-weight: 400;
        /* css3中的 抗字体锯齿*/
        -webkit-font-smoothing: antialiased;
    }

    .login-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: #FFF;
        width: 100%;
        max-width: 400px;
        margin: 0;
        padding: 2.25em;
        box-sizing: border-box;
        border-radius: .5em;
        border: 1px solid #DDD;
    }
</style>
