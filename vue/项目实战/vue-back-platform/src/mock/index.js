import Mock from 'mockjs'

export default {
    mockData () {
        Mock.mock('/api/user/login', {
            'success': true,
            'result': {
                'id': '1001',
                'name': '张三',
                'roles': ['admin']
            }
        })

        Mock.mock('/api/user/register', {
            'success': true,
            'result': {}
        })
    }
}
