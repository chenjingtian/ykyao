/*
* 时间戳转日期
*/
export function toLocaleString (timestamp) {
  let date = new Date(timestamp),
      Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ',
      h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
      m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':',
      s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
  return Y + M + D
}

/*
* 秒转成时分
*/
export function formatSecond(value) {
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0;// 分
  var hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60)
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60)
      }
  }
  var result = "";
  if(minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "分" + result;
  }
  if(hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result
}

/*
* js获取当前时间指定的前几天日期
*/
export function getBeforeDate (n) {
  let s = '',
      d = new Date(),
      year = d.getFullYear(),
      mon = d.getMonth() + 1,
      day = d.getDate();
  if(day <= n){
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year-1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth()+1;
  day = d.getDate();
  s = year + "-" + (mon < 10 ? ('0'+mon):mon) + "-" + (day < 10?('0'+day):day);
  return s;
}
