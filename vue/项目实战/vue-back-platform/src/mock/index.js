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
    }
}
