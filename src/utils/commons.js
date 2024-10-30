export function throttle(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      return;
    }
    let _this = this,
      argu = arguments;
    timer = setTimeout(function () {
      fn.apply(_this, argu);
      timer = null;
    }, delay);
  };
}
export function matchMax(arr) {
  let len = arr.length;
  var newArr = arr.sort();
  return newArr[len - 1];
}
