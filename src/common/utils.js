/**
 / 防抖
 * func [function] 需要防抖的函数=
 * delay [number] 毫秒,防止抖动其限制
 */
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if(timer !== null)  clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

// 自己写的时间转换函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    //js正则表达式test方法的问题
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};


// 3 -> 003 -> 03
// 03 -> 0003 -> 03
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

