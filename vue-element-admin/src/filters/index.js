// 导出时间转换函数
export { parseTime, formatTime } from '../utils'
import { isNumer } from '../utils'

/**
 * 10000 --> "10,000"
 * @param {Number} num
 */
export function toThousandFilter (num) {
  if (!isNumer(num)) {
    throw new Error('非数字类型')
  }

  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
