import request from '../utils/request'

export function transactionList (query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
