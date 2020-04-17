/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * 简单的深度复制，有某些边缘情况可能不能使用此方法, 更好的是使用 lodaash的 _.cloneDeep
 * @param {Object} source
 * @returns {Object} 返回一个深拷贝的副本
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('请传入一个对象', 'deepClone')
  }

  const targetObj = source.constructor === Array ? [] : {}

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      targetObj[key] = deepClone(source[key])
    } else {
      targetObj[key] = source[key]
    }
  })

  return targetObj
}
