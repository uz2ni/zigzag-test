window.onload = function () {
  console.log("| 시각 | N | 답 |");
  console.log("|---|---|---|");
  alterDateFormat("PM 01:00:00", 10);
  alterDateFormat("PM 11:59:59", 1);
  alterDateFormat("AM 00:10:00", 40);
  alterDateFormat("AM 05:24:03", 102392);
}

function alterDateFormat(timePattern, sec) {
  const [type, time] = timePattern.split(" ");

  let secTime = secToTime(sec);
  secTime.input_h = newHour(secTime.input_h);

  let sumTime = timeSum(time, secTime);
  sumTime = roundUp(sumTime);

  if(type == 'AM' && (sumTime.sum_h >= 24)) {
    sumTime.sum_h -= 24;
  }else if(type == 'PM' && (sumTime.sum_h >= 12)) {
    sumTime.sum_h -= 12;
  }else if(type == 'PM' && (sumTime.sum_h < 12)) {
    sumTime.sum_h += 12;
  }
  if(sumTime.sum_h<10){sumTime.sum_h='0'+sumTime.sum_h}
  if(sumTime.sum_m<10){sumTime.sum_m='0'+sumTime.sum_m}
  if(sumTime.sum_s<10){sumTime.sum_s='0'+sumTime.sum_s}

  resultTime = sumTime.sum_h + ":" + sumTime.sum_m + ":" +sumTime.sum_s;
  console.log("| " + type + " " + time + " | " + sec +" | " + resultTime + " | ");
}

const secToTime = (sec) => {
  let data = new Object();
  data.input_h = parseInt(sec/3600);
  data.input_m = parseInt((sec%3600)/60);
  data.input_s = sec%60;
  return data;
}

const newHour = (hour) => {
  while(hour >= 24) {
    hour = hour-24;
  }
  return hour;
}

const timeSum = (time, secTime) => {
  let data = new Object();
  let [time_h,time_m,time_s] = time.split(":");
  time_h = parseInt(time_h); time_m = parseInt(time_m); time_s = parseInt(time_s);
  data.sum_h = (time_h + secTime.input_h);
  data.sum_m = (time_m + secTime.input_m);
  data.sum_s = (time_s + secTime.input_s);

  return data;
}

const roundUp = (sumTime) => {
  if((sumTime.sum_s/60) != 0) {
    sumTime.sum_m += Math.floor(sumTime.sum_s/60);
    sumTime.sum_s = Math.floor(sumTime.sum_s%60);
  }
  if((sumTime.sum_m/60) != 0) {
    sumTime.sum_h += Math.floor(sumTime.sum_m/60);
    sumTime.sum_m = Math.floor(sumTime.sum_m%60);
  }
  return sumTime;
}
