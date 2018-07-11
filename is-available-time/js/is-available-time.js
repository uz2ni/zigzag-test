window.onload = function () {

  console.log("***************** 요일 별 숫자 참고하세요 ***************** ");
  console.log("월(1), 화(2), 수(3), 목(4), 금(5), 토(6), 일(7), 그외(-1)");
  console.log("******************************************************");

  isAvailableTime("평일 09:00~18:00, 토요일 09:00~13:00", "화 15:30");
  isAvailableTime("월,수 09:00~18:00", "목요일 12:00");
  isAvailableTime("평일 09:00~13:00, 14:00~18:00");
}

function isAvailableTime (timePattern, testTime = getNowTime()) {
  console.log("<< 이용 가능 시간 확인하기 >>");
  console.log("시간 패턴: " + timePattern);
  console.log("비교 시각: " + testTime);

  console.log("-----------------------------------");

  let tempDay; // 기존 시간 담아두는 변수
  const times = timePattern.split(", ");

  console.log("times:");
  console.log(times);
  console.log("-----------------------------------");

  for(var i=0; i<times.length; i++) {

    let [day, time] = times[i].split(" ");
    if(time === undefined){
      time = day;
      day = tempDay;
      console.log("기존 요일: "+day + ", 이용 가능 시각: " + time);
    }

    let [start, end] = time.split("~");
    let days = day.split(",");

    for(var j=0; j<days.length; j++){

      console.log("이용 가능 요일: "+dayToInt(days[j]) + ", 이용 가능 시각: " + start + "~" + end);
      tempDay = days[j];

      let [d, t] = testTime.split(" ");
      console.log("비교 요일: " + d + ", 입력 시각: " + t);

      // 이용 가능 판단
      if ( compareDay(dayToInt(days[j]), d) && compareTime(start,end,t) ) {
        console.log("최종 결과 : 이용 가능한 시간입니다.");
        return true;
      }else {
        console.log("해당 시각은 이용 불가");
        console.log("-----------------");
      }
    }
  }
  console.log("최종 결과 : 이용 불가능한 시간입니다.");
  return false;
}

const compareDay = (avl, now) => {
  return (avl == now) || (-1 == avl);
}

const compareTime = (start, end, now) => {
  return ((start <= now)&&(now < end));
}

const getNowTime = () => {
  let date = new Date();
  let day = date.getDay();
  let hour = date.getHours();
  let min = date.getMinutes();
  if(hour<10){hour='0'+hour} if(min<10){min='0'+min}
  return day+" "+hour+':'+min;
}

const dayToInt = (day) => {
  if( day==("월") || day==("월요일") ) return 1;
  else if( day==("화") || day==("화요일") ) return 2;
  else if( day==("수") || day==("수요일") ) return 3;
  else if( day==("목") || day==("목요일") ) return 4;
  else if( day==("금") || day==("금요일") ) return 5;
  else if( day==("토") || day==("토요일") ) return 6;
  else if( day==("일") || day==("일요일") ) return 7;
  else return -1;
}
