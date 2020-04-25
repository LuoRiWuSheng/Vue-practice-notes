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

/**
 * 防抖
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 距离上一次触发时间间隔
    const last = +new Date() - timestamp

    if (last < wait && last > 0) {
      // 延迟wait- last再执行
      timeout = setTimeout(later, wait - last)
    } else {
      // 距离上一次时间已经过了
      timeout = null

      // 如果设定immediate =true  因为开始边界调用过，此处无需调用
      if (!immediate) {
        result = func.apply(context, args)

        if (!timeout) {
          context = args = null
        }
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout

    if (!timeout) timeout = setTimeout(later, wait)

    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 判断是不是数字
 * @param {number} obj
 */
export function isNumer(obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

/**
 * 将时间转换成一个字符串格式输出
 * @param {(Object | String | Number)} time
 * @param {String} cformat
 * @return {String | Null}
 */
export function parseTime (time, cformat) {
  if (arguments.length === 0) return null

  const format = cformat || '{y}-{m}-{d} {h}:{i}:{s}'

  let date

  if (typeof time === 'object') {
    // 说明传入的日期是 new Date() 直接是日期对象
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // 支持时间戳
        time = parseInt(time)
      } else {
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm, '/'))
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }

    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })

  return time_str
}

/**
 * 格式化时间
 * @param {number} time
 * @param {string} option
 */
export function formatTime (time, option) {
  // 将时间戳毫秒转换为秒，时间戳长度是13位
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
