<template>
    <info-show></info-show>
</template>

<script>
let infoShow = {
    template: `
         <div class='panel-header'>
            <div v-for='(item, index) in items' class="item">
                <i class="fa" :class="icon"></i>
                <div>
                    <p>{{item.title}}</p>
                    <p>{{item.count}}</p>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
            items: [
                {
                    icon: 'cloud',
                    title: '待办事项',
                    count: 12
                },
                {
                    icon: 'envelope-o',
                    title: '系统消息',
                    count: 8
                },
                {
                    icon: 'envelope-o',
                    title: '代码量',
                    count: 5836
                }
            ],
            icon: ''
        }
    }
}

export default {
    name: 'FuncHome',
    components: {
        'info-show': infoShow
    }
}
</script>

<style lang="scss" scoped>
.panel-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;

    .item {
        flex: 1;
        background-color: #FFFFFF !important;
    }
}
</style>
