/**
 * 规则校验
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 校验用户名合法性
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
