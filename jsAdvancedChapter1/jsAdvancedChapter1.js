// * 자바 스크립트 함수가 실행되는 과정


// 자바스크립트 코드의 실행 1

// 어떤 코드도 없는 경우 자바스크립트 엔진의 초기화 하는 것

// 1. this: window
//윈도우 객체는 브라우저에서 최상위에 위치하는 객체

// 2. 변수들: {}
// 어떠한 변수도 선언되지 않았지 때문에 빈객체가 반환된다.

// 3. Scope chain: []
// 최상단의 객체이므로 빈 객체가 반환된다.


// 자바스크립트 엔진은 코드가 없어도 실행 환경(실행 컨텍스트)을 초기화한다.

// 스코프(scope)는 코드가 현재 실행되는 환경, 맥락(context)을 의미한다.

// this 포인터, 스코프에 저장된 변수들, 스코프 체인 등이 환경에 포함된다.

// this 포인터의 경우, 글로벌 스코프에서는 window를 가리킨다.


// 자바스크립트 코드의 실행 2
const a = 15;
const b = 25;

function myFunc() { 
  let a = 10;
  let b = 20;
  function add(first, second) { 
    return first + second;
  }
  return add(a, b); // 중첩함수, 콜백함수를 사용할 경우 클로저가 작동되어 스코프 체인은 한단계 상위 스코프를 가리킨다.
}

myFunc(); // 30;

// 자바스크립트 코드의 실행 3

let o = {
  name: 'Daniel',
  method: function(number) {
    return this.name.repeat(number); // repeat 메서드는 인수의 숫자값만큼 문자열을 반복한다, 메서드 내에서 this를 사용할 시 자기 자신의 객체를 반환한다.
  }
};

function myFunc() {
  let n = 10;
  return console.log(o.method(n)); 
}

myFunc() // 'Daniel'이 10번 출력된다.


// 객체의 메서드의 경우, 메서드 환경의 this는 해당 객체를 가리키게 된다.
// 하지만 this가 가리키는 것은 환경에 따라 변할 수 있다.


// * 실행 컨텍스트

// 자바스크립트 코드가 실행되는 환경을 말한다.
// 코드에서 참조하는 변수, 객체(함수 포함), this 등에 대한 레퍼런스가 있다.
// 실행 컨텍스트는 전역에서 시작해, 함수가 호출될 때 스택에 쌓이게 된다.






