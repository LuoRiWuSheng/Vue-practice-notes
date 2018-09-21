<template>
   <div>
        <info-show></info-show>
        <el-row :gutter='20' class='penel'>
            <el-col :span='18' :sm='24' :lg='18' class='chart'>
                <el-card class='box-card'>
                    <ve-line :data="chartData1" :settings='chartSettings1'></ve-line>
                </el-card>
            </el-col>
            <el-col :span='6' :lg='6'>
                <el-row :gutter="20" align>
                    <el-col :sm='12' :lg='24'>
                        <el-card shadow='hover' class='m-box-card' style='height: 215px; background: rgb(143, 201, 251); color: #FFF'>
                            <div slot='header'>
                                <p style='text-align: center'>
                                    <i class='fa fa-address-card-o' style='color: #F56C6C; font-size: 35px;'></i>
                                </p>
                                <div>
                                    <p>帐号: 张三</p>
                                    <p>登录地址: 192.168.0.0</p>
                                    <p>时间: {{date | getDate()}}</p>
                                </div>
                            </div>
                            <div style='font-size: 12px;'>
                                <p>上次登录地址: 192.1.1.1</p>
                                <p>上次登录时间: 2012.02.03</p>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :sm='12' :lg='24'>
                        <el-card style="height: 215px; background: rgb(247, 151, 214); color: #FFF;margin-top: 10px">
                            <vue-scroll>
                                <!-- 这里最好有一个外层元素包裹，不然就会报 要我们指定什么name之类的 -->
                                <div style="padding: 20px; height: 150px">
                                    <p style="font-weight: bold;text-align: center">重要通知</p>
                                    <p v-for="index in 20" :key="index">{{index}}. 帅哥/美女出没，请注意！</p>
                                    <p>~(˘▾˘~)~(˘▾˘~)</p>
                                    <p>对面的帅哥/美女，你好啊。</p>
                                </div>
                            </vue-scroll>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20" class='task-panel'>
            <el-col :span='12' :xs='12' :sm='12' :md='12' :lg='12'>
                <el-card style='height: 300px' shadow='hover'>
                    <template>
                        <!-- el-table加个height 就可以实现头部固定，表中内容滚动 -->
                        <el-table :data='tableData' style="width: 100%;" height="250" :row-class-name='tableRowClassName'>
                            <el-table-column prop='date' label='日期'></el-table-column>
                            <el-table-column prop='name' label='姓名'></el-table-column>
                            <el-table-column prop='address' label='地址'></el-table-column>
                        </el-table>
                    </template>
                </el-card>
            </el-col>
             <el-col :span='12' :xs='12' :sm='12' :md='12' :lg='12'>
                <el-card  style='height: 300px' shadow='hover'>
                    <h3 style='text-align: center'>任务进度</h3>
                    <div v-for='(progress, index) in progresss' :key='index'>
                        <div class="line-progress">
                            <div style='float: left'>
                                {{progress.title}}
                            </div>
                            <div style='float: left; width: calc(100% - 80px); margin-left: 20px;'>
                                <el-progress :percentage="progress.percentage" :stroke-width='30' :text-inside='true'>
                                </el-progress>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
   </div>
</template>

<script>
import {getIndexData} from '@/api/user'
import 'element-ui/lib/theme-chalk/display.css'
import VeLine from 'v-charts/lib/line.common'
import VeScatter from 'v-charts/lib/scatter.common'

let infoShow = {
    template: `
         <el-row class='panel-header' :gutter="20">
            <el-col v-for='(item, index) in items' :span='6' :key='index' :xs='24' :sm='12' :md='6' :lg='6'>
                <el-card class='task'>
                    <i class="fa fa-3x" :class="item.icon" :style="{color: item.color}"></i>
                    <div>
                        <p>{{item.title}}</p>
                        <p>{{item.count}}</p>
                    </div>
                 </el-card>
            </el-col>
        </el-row>
    `,
    data () {
        return {
            items: [],
            icon: ''
        }
    },
    created () {
        getIndexData('/api/index').then(data => {
            this.items = data
        }).catch(err => {
            console.log('捕捉到-->', err)
        })
    }
}

export default {
    name: 'FuncHome',
    components: {
        'info-show': infoShow,
        VeLine,
        VeScatter
    },
    data () {
        return {
            chartData1: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                    {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                    {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                    {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                    {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                    {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                ]
            },
            // 设置v-chart中的数据格式，配合settings属性
            chartSettings1: {
                axisSite: {right: ['下单率']},
                yAxisType: ['KMB', 'percent'],
                yAxisName: ['数值', '比率']
            },
            date: new Date(),
            tableData: [
                {
                    name: '小红',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小黄',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小绿',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小绿',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小红',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小黄',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小绿',
                    date: '2018-3-12',
                    address: '武汉市'
                },
                {
                    name: '小绿',
                    date: '2018-3-12',
                    address: '武汉市'
                }
            ],
            progresss: [
                {
                    title: '语文',
                    percentage: 15
                },
                {
                    title: '数学',
                    percentage: 90
                },
                {
                    title: '英语',
                    percentage: 55
                }
            ]
        }
    },
    methods: {
        tableRowClassName ({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return ''
        }
    },
    filters: {
        getDate (val) {
            return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
        }
    }
}
</script>

<style lang='scss'>
.panel-header {
    .task {
        width: 100%;
        background: #FFF;
        color: #666;
        margin-bottom: 20px;
        i {
            margin-right: 20px;
        }
        p:first-child {
            margin-bottom: 5px;
        }
    }
    div {
        display: inline-block;
    }
}
.task-panel {
   margin-top: 20px;
}
.el-table .warning-row {
    background: oldlace;
}
.el-table .success-row {
    background: #f0f9eb;
}
</style>

<style lang='scss' scoped>
.penel {
    .chart {
        padding-left: 20px;
        padding-right: 20px;
    }
}
.line-progress {
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
}
</style>
