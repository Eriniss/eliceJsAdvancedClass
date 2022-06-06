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
{
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
}


// 자바스크립트 코드의 실행 3

{
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
}

// 객체의 메서드의 경우, 메서드 환경의 this는 해당 객체를 가리키게 된다.
// 하지만 this가 가리키는 것은 환경에 따라 변할 수 있다.


// * 실행 컨텍스트

// 자바스크립트 코드가 실행되는 환경을 말한다.
// 코드에서 참조하는 변수, 객체(함수 포함), this 등에 대한 레퍼런스가 있다.
// 실행 컨텍스트는 전역에서 시작해, 함수가 호출될 때 스택에 쌓이게 된다.

{
  let a = 10; // 1) 전역 컨텍스트에서 호출
  function f1() { // 1) 전역 컨텍스트에서 호출
    let b = 20;
    function print(v) { console.log(v); } // 1) console은 전역 컨텍스트에서 실행된다. 2) print 함수는 f1 함수 컨텍스트에서 실행된다
    function f2() { // 2) f2 함수는 f1함수 컨텍스트에서 실행된다.
      let c = 30; // 3) 변수 c는 f2 함수 컨텍스트에서 실행된다.
      print(a + b + c); // 3) 표현식 print는 f2 함수 컨텍스트에서 실행된다.
    }
    f2();
  }
  f1();
}
// 자바스크립트가 실행될 때 전역 실행 컨텍스트가 만들어 진다
// 함수가 실행될 때 함수 실행 컨텍스트가 만들어 진다.


// * this가 가리키는 것

// 함수가 호출되는 상황은 4가지가 있다.
// 1) 일반 함수 호출, 2) 메서드 호출, 3) 생성자 호출, 4) 간접 호출(call, apply, bind 등)

// 그외 콜백 함수의 호출이 있다.
// 콜백 함수는 특정 동작 이후 불려지는 함수이다.
// 보통 다른 함수의 인자로 보내지는 함수를 의미한다.
// setTimeOut 메서드도 콜백함수를 이용한다.

{
  function myFunc() {
    console.log('myFunc called')
  }

  myFunc() // 함수를 직접 호출.

  const o = {
    name: 'Daniel',
    printName: function() {
      console.log(this.name);
    }
  }

  o.printName() // 객체의 메서드를 호출
}

{
  function Person(name) {
    this.name = name;
    this.printName = function() {
      console.log(this.name);
    }
  }

  const p = new Person('Daniel'); // 생성자 호출
  setTimeout(p.printName.bind(p, 1000)); // 간접 호출
}
//함수는 이렇듯 다양한 상황(환경)에서 호출될 수 있다.
// 함수의 호출 환경에 따라 this는 동적으로 세팅된다.
// 이렇게 this가 환경에 따라 바뀌는 것을 도적 바인딩(dynamic binding)이라 한다.
// bind, apply, call 등으로 this가 가리키는 것을 조작할 수 있다.


// * 화살표 함수와 일반 함수의 this

// 화살표 함수의 this는 호출된 함수를 둘러싼 실행 컨텍스트를 가리킨다.
// 일반 함수의 this는 새롭게 생성된 실행 컨텍스트를 가리킨다.

{
  const o = {
    method() {
      console.log("context : ", this) // o 일반함수의 this는 항상 global을 가리킨다.
      let f1 = function () {
        console.log("[f1] this :", this);
      }
      let f2 = () =>
      console.log("[f2] this : ", this)
      f1() // global, 일반 함수의 this는 항상 global을 가리킨다.
      f2() // o, 화살표 함수의 this는 항상 한단계 위의 객체를 가리킨다.
    }
  }
  o.method();
}
// 화살표 함수의 this는 정해지면 바꿀 수 없다.
// call, bind, apply를 사용해도 바뀌지 않는다.
// setTimeout 등 this가 바뀌는 상황에서 유용하다.
{
  window.name = 'Daniel';
  let o = { name : 'Kim' };

  let arrowFunction = (perfix) => console.log(prefix + this.name);

  arrowFunction('Dr. ') // Dr. Daniel
  arrowFunction.bind(o)('Dr. '); // Dr. Daniel
  arrowFunction.apply(o)('Dr. '); // Dr. Daniel
  arrowFunction.call(o)('Dr. '); // Dr. Daniel
}
// 위의 예제처럼 어떤 간접 호출을 사용해도 this값을 바꿀 수 없다.


// * 자바스크립트 Closure

// 일급 객체란, 다른 변수처럼 대상을 다룰 수 있는 것을 말한다.
// 자바스크립트에서 함수는 일급 객체 이다.
// 즉, 자바스크립트에서 함수는 변수처럼 다룰 수 있다.

// 자바스크립트 클로저는, 함수의 일급 객체 성질을 이용한다.
// 함수가 생성될 때, 함수 내부에서 사용되는 변수들이 외부에 존재하는 경우 그 변수들은 함수의 스코프에 저장된다.
// 함수와 함수가 사용하는 변수들을 저장한 공간을 클로저(closure)라 한다.

{
  let rate = 1.05;

  function app() {
    let base = 10;

    return function (price) {
      return price * rate + base;
    }
  }

  const getPrice = app();
  getPrice(120); // 136
}
// base는 app 함수 내부, rate는 app 함수 내부의 스코프에 존재한다.
// 함수가 참조하는 변수는 실행 시점에 실행 컨텍스트에 의해 스코프가 결정된다.


// * Rest, Spread Operator

// Rest
// 함수의 인자, 배열, 객체 중 나머지 값을 묶어 사용하도록 한다.

{
  function findMin(...rest) {
    return rest.reduce((a, b) => a < b ? a : b);
  }

  findMin(7, 3, 5, 2, 4, 1) // 1
}
// 함수 인자 rest operator는 인자들을 배열로 묶는다.
// restdpsms tntwkemfdl qoduffh ekarlsek.
// reduce 함수로 min 값을 리턴한다.


// Spread Operator
// 묶인 배열 혹은 객체를 각각의 필드로 변환한다.

{
  let o = {
    name: "Daniel",
    age: 23,
    address: "Street",
    job: "Software Enginner",
  };

  let o2 = { ...o, name: "Tom", age: 24 }; // ...가 스프레드 오퍼레이터다. ...이 앞에 위치하게 되면 ... 뒤의 데이터가 앞의 o 객체의 데이터를 덮어 씌우게 된다.

  let o3 = { name: "Tom", age: 24, ...o }; // ...이 뒤에 위치하게 되면 스프레드된 o 객체가 o3를 덮어 씌우게 된다.

  o2.age; // 24
  o3.name; // Daniel
}



