/**
 * 防抖函数
 * @param {Function} fn 需要执行防抖操作的函数
 * @param {Number} delay 结束触发 delay 毫秒后，执行函数。默认 200 ms
 * @returns {Function}
 */

export default function debounce(fn, delay = 200) {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
