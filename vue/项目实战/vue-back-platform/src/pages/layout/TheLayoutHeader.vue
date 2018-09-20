<template>
    <el-container>
        <el-header class='header'>
            <router-link to='/index'>
                <div class='logo' :class="{'logo-hide': !openNav}">
                    <img src="../../assets/logo.png" class='image' />
                    <span class='text'>LLPlatform</span>
                </div>
            </router-link>
            <div class="content"  @click='navOpenToggle'>
                <i class="fa fa-align-justify toggle" title='显示/隐藏菜单'></i>
            </div>
            <!-- element-ui下拉菜单 -->
            <el-dropdown trigger='hover' class='user'>
                <span class="user-info">
                    {{user_name}} <i class='fa fa-user-circle-o fa-2x' style="margin-left: 10px"></i>
                </span>

                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item>我的账号</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item divided>主题设置</el-dropdown-item>
                    <el-dropdown-item>语言选择</el-dropdown-item>
                    <el-dropdown-item divided>
                        <router-link to='/login'>退出登录</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
    </el-container>
</template>

<script>
export default {
    name: 'TheLayoutHeader',
    props: ['openNav'],
    data () {
        const user_info = JSON.parse(sessionStorage.getItem('user-info'))
        const user_name = user_info['name']

        return {
            user_name
        }
    },
    methods: {
        navOpenToggle () {
            this.$emit('toggle-open')
        }
    }
}
</script>

<style scoped lang='scss'>
.header {
    height: 60px;
    color: #FFF;
    background-color: #409EFF;
    line-height: 60px;
    .logo {
        float: left;
        width: 240px;
        height: 100%;
        border-right: 1px solid #c0c4CC;
        margin-left: -20px;
        font-size: 25px;
        cursor: pointer;
        .image {
            width: 40px;
            height: 40px;
            vertical-align: middle;
        }
    }
    .logo-hide {
        width: 65px;
        .text {
            display: none;
        }
    }
    // 切换菜单--显示隐藏
    .content {
        float: left;
        width: 40px;
        height: 100%;
        .toggle {
            font-size: 14px;
            cursor: pointer;
        }
    }
    // 右侧 用户功能菜单
    .user {
        float: right;
        cursor: pointer;
        .user-info {
            color: #FFF;
            i {
                vertical-align: middle;
            }
        }
    }
}
</style>
