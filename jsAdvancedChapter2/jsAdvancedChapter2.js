// * 자바스크립트 실행

// 자바스크립트 엔진은 자바스크립트 코드를 읽어 실행하는 프로그램이다.
// 작성한 자바스크립트 코드는 자바스크립트 엔진을 통해 파싱되고 실행된다.
// Chrome 브라우저의 경우 V8 엔진을 사용한다.

// node.js는 브라우저 외의 환경에서 자바스크립트 코드를 실행하도록 하는 프로그램이다.
// Node.js는 여러 프로그램으로 구성되며, 자바스크립트 코드를 읽는 프로그램으로 V8을 사용한다.
// 브라우저 환경과 node.js환경은 같은 자바스크립트 코드를 작성해도 다르게 동작할 수 있다.

// 자바사크립트 엔진은 코드 실행 전 실행 컨텍스트를 생성한다.
// 실행 컨텍스트는 두 단계를 통해 생성된다.
// 자바스크립트 엔진은 생성 단계에서 변수 선언을, 실행 단계에서 변수값을 할당한다.

// 함수의 렉시컬 환경은, 함수가 사용하는 변수들을 둘러싼 환경을 의마.
// 특정 변수의 값은 함수의 렉시컬 환경 안에서 찾을 수 있다.
// 렉시컬 환경은 실행 컨텍스트 안에 정의된 Variable Object로 이해할 수 있다.

// 자바스크립트 엔진은 생성 단계에서 함수 선언문, 함수 표현식, 변수 등을 읽어 실행 컨텍스트에 저장한다.
// 변수의 경우, 실행 컨텍스트의 렉시컬 환경을 구성한다.
// 함수 선언문 외에 변수는 값이 저장되지 않는다. 생성 단계에서 변수는 undefined로 초기화 되어있다.

// 자바스크립트 엔진은 변수에 값을 할당하는 구문을 만나면 실행 컨텍스트에 값을 저장한다.
// 그 외 코드를 한 줄씩 읽어 나가며 실행한다. 즉, 실행단계에서는 이미 생성 단계에서 초기화된 변수에 값을 할당한다.


// * 자바스크립트 Hoisting

// 자바스크립트 엔진이 코드를 읽으면, 생성 단계에서 실행 컨텍스트를 생성한다.
// 이때 함수 선언문은 실행 단계에서 함수 전체가 실행 컨텍스트에 저장된다.
// var 변수는 저장 시 undefined로 초기화된다.
// let, const는 초기화되지 않는다.

{
  console.log(callMe()); // undefined

  var x = 10;

  console.log(callMe()); // 10

  function callMe() {
    return x;
  }
}
// var은 ES6 이후로 사용하지 않는다.

{
  console.log(callMe()); // undefined

  var x = 10;

  console.log(callMe()); // 10

  function callMe() {
    return x;
  }
}
// let, const도 호이스팅이 발생한다. 하지만 var처럼 undefined로 초기화 되지 않는다.
// 하지만 호이스팅하여 접근 시 사각지대(dead zone)가 발생하여 에러가 발생한다.

// var은 함수 레벨 스코프, let과 const는 블록 레벨 스코프다.
// 즉, var은 함수 외의 블록에서 사용 시 호이스팅이 발생하여 전역변수로 선언될 리스크가 있으므로 사용하지 않는다.
// 따라서 ES6 이후로 var 사용을 금지하고 let, const를 사용한다.

{
  function varFor () {
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log("i: ", i), 0);
    }
  }

  varFor(); // 3 3 3, 이는 var이 함수 레벨 스코프이기 때문에 블록과 바인딩된 상위스코프, 즉 varFor 함수의 스코프로 변수가 할당되었기 때문이다.
  // 이러한 문제점은 블록 레벨 스코프인 let 키워드를 사용하면 해결이 가능하다.
}


// * 자바스크립트 내장 객체

// 자바스크립트는 여러 용도에 ㄷ활용하는 객체를 내장하고 있다.
// 숫자 다루기, 문자 다루기, 날짜 다루기, JSON 객체 다루기 등에 유용한 객체를 제공한다.
// 핵심 내장 객체들의 기능을 이해하면, 실제 프로젝트에서 유용하게 활용할 수 있디.

// globalThis는 전역 객체를 지칭하는 변수이다.
// 전역 객체는 환경에 따라 다르다.
// 브라우저 환경은 window, node 환경은 global 객체를 지칭한다.
// globalThis는 환경별 차이를 통일하여 하나의 변수로 서로 다른 전역 객체를 가리키게 한다.

// window는 DOM documemt를 포함하는 창을 나타내는 객체
// 전역 스코프에 선언된 변수는 모두 window의 property가 된다.
// 현재 창의 정보를 얻거나, 창을 조작한다.

// globalThis도 window를 지칭한다.

// document는 createElement, createTextNode는 동적으로 원소를 생성한다.
// 이를 활용해 자바스크립트만으로 원소를 구성할 수 있다.


// * 자바스크립트 내장 객체 2

// 자바스크립트의 number 원시타입을 감싸는 객체.
// 유의미한 상수값, 숫자를 변환하는 메서드 등을 제공한다.
// NaN(Not a Number)를 나타내는 객체.
// isNaN() - 전역 함수로, 입력값을 숫자로 변환했을 때 NaN이 되는지를 검사.

{
  function cahngeToTus(krw) {
    const rate = 1046;
    return (krw / 
    rate).toFixed(2); // Number.toFixed(x) 메서드는 숫자의 소숫접 자릿수를 제어한다. 뒤의 (x)는 옵션이며 x값만큼의 소수자리를 처리한다.
  }

  const Krw = 1000000;
  console.log(changeToUsd(krw)); // changeToUsd에서 변환된 krw를 소숫점 둘째자리까지만 처리하도록 한다.
}


{
  function formatNumber(n) {
    if (isNaN(n)) return '0';
    return Number(n).toFixed(2); // toFixed는 반올림을 한다.
  }

  formatNumber('12.345'); // 12.35
}


// Math는 기본적인 수학 연산 메서드, 상수를 다루는 객체이다.
// bigInt 타입과 호환되지 않고, Number 타입만을 인자로 다른 인자로 다룬다.

{
  function getMaxDiff(nums) {
    return Math.max(...nums) - Math.min(...nums);
  }

  getMaxDiff([-1, -4, -7, 11]); // 18
} // 배열의 요소중 최대값에서 최소값을 뺀 값을 반환하는 함수

{
  function getRandomNumberInRange(min, max) {
    return Math.fllor(Math.random() * (max - min + 1)) - min;
  }

  Array.from({ length: 10}).map(() =>
  getRandomNumberInRange(50, 100));
} // 50에서 100사이의 랜덤한 숫자르 반환하는 함수


// * 자바스크립트 내장 객체 3

// 특정 시점의 날짜를 표시하기 위한 객체
// 날짜와 관련된 작업을 하기 위한 여러 메서드를 포함한다.

{
  function isWeekend(todya) {
    let day = today.getDay();
    return day === 0 || day === 6;
  }

  console.log(isWeekend(new Date("2021/9/12")));
}
// Date.getDay()는 요일을 O(일요일)부터 6(토요일) 로 구분한다.
// 이 외에도 년도, 월, 일, 시 ,분, 초, 밀리초 등을 구할 수 있다.

{
  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date.toDateString();
  }

  addDays(new Date("2021/9/22", 1000));
} // Fri Dec 31 2021

{
  function timeDiff (date1, date2) {
    returndate2.getTime() - 
    date1.getTime();
  }
  
  let dayTime= 60* 24* 60* 1000;

  function fromNow(date) {
    let diff= timeDiff(date, new Date());
    return`${Math.floor(diff/ dayTime)} days ago...`;
  }

  fromNow(newDate("2021/9/1"));
}
// getTime() 메서드는 시간을 밀리초 단위로 반환한다.
// 이때 밀리초는 1970.1.1 시접부터 흐른 시간이다.
// fromNow는 주어진 시간이 현재로부터 며칠이나 흘렀는지를 계산한다.


// String은 자바스크립트의 문자열 원시 타입의 래퍼 객체이다.
// 문자열을 조작히기 위한 여러 메서드를 포함한다
// JSON - JSON 객체와 관련된 메서드를 담은 객체이다.

{
  function toUserList(users) {
    return users
      .filter((user) => !user.includes("Admin"))
      .map((user) => user.trim().toUpperCase()).map((user) => `<li>${user}</li>`)
      .join("");
    }
    
    console.log(toUserList(["Daniel", "Tom", "Johnny", "Admin"]));
    // <li>DANIEL</li><li>TOM</li><li>JOHNNY</li>
}
// trim(), toUpperCase() 등은 변환된 새로운 문자열을 리턴한다.
// includes()메서드는 문자열 검색에 성공 시 true, 실패 시 false를 리턴한다.
// toUserList()는 이름의 배열을 받아 리스트 태그 목록의 문자열을 계산한다.

{
  "Daniel,Kim,SW".split(',');
  // [ 'Daniel', 'Kim', 'SW' ]

  "Daniel,Kim,SW".replace(',', ' ') ;
  // "Daniel Kim SW"

  "Daniel,Kim,SW".includes("Kim");
  // true"  Daniel,Kim,SW".trim()
  // "Daniel,Kim,SW"

  "Daniel,Kim,SW".indexOf("Kim");
  // 7
}
// split()은 주어진 문자열에 따라 타겟 문자열을 나눈다.
// replace()는 주어진 문자열을 검색하여 타겟 문자열로 변환한다.
// indexOf()는 특정 문자열을 검색하여 시작점의 인덱스를 반환한다. 없을 시 -1을 리턴한다.


{
  JSON.stringify({ name: "Daniel", age: 12});
  // '{"name":"Daniel", "age":12}'

  JSON.parse('{"name":"Daniel","age":12}');
  // { name: 'Daniel', age: 12 }
}
// JSON.stringify()는 주어진 객체를 JSON 문자열로 만든다.
// JSON.parse()는 주어진 JSON 문자열을 자바스크립트에 맞는 결과 객체로 만든다.




