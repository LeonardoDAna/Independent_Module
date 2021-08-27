export function throttle(fn, delay) {
  let timer
  return function () {
    if (timer) {
      return
    }
    let _this = this,
      argu = arguments
    timer = setTimeout(function () {
      fn.apply(_this, argu)
      timer = null
    }, delay)
  }
}
