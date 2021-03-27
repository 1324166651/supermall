export function debounce(func, delay) {
let timer = null
return function (...args) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
 /**
     * 防抖函数相关的方法
     */
    // settimeout不管时间填不填都是放到下一次时间循环进行的，哪怕放到最上面，如果有settimeout还是比下面没有的要慢执行
    // clearTimeout清除 里面有闭包变量不会被销毁
// 时间格式化 这是字符串正则表达式 使用了替换和截取字符串函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  return fmt;
}