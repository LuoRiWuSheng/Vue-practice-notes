import Mock from 'mockjs'

export default {
    mockData () {
        Mock.mock('/api/user/login', {
            'success': true,
            'result': {
                'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
            }
        })

        Mock.mock('/api/user/register', {
            'success': true,
            'result': {
                'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
            }
        })

        Mock.mock('/api/user/info', {
            'success': true,
            'result': {
                'id': '1001',
                'name': '张三',
                'roles': ['admin'],
                'permissions': [
                    {
                        path: '/index'
                    },
                    {
                        path: '/forms/base'
                    },
                    {
                        path: '/forms/edit'
                    }
                ]
            },
            'error': {
                'code': 100000,
                'message': '无效的token'
            }
        })

        Mock.mock('/api/index', {
            'result': [
                {
                    icon: 'fa-tasks',
                    title: '待办事项',
                    count: 12,
                    color: 'rgb(245, 108, 108)'
                },
                {
                    icon: 'fa-envelope-o',
                    title: '系统消息',
                    count: 8,
                    color: 'rgb(230, 162, 60)'
                },
                {
                    icon: 'fa-file-code-o',
                    title: '代码量',
                    count: 5836,
                    color: 'rgb(103, 194, 58)'
                },
                {
                    icon: 'fa-snowflake-o',
                    title: '天气',
                    count: '武汉，多云，26℃',
                    color: 'rgb(64, 158, 255)'
                }
            ],
            'success': true
        })
    }
}
