// * 자바스크립트 제어 흐름


// 자바스크리브는 다른 멀티스레드 프로그래밍 언어와 다른 방식으로 비동기 동작을 처리한다.
// 처음 자바 스크립트를 접하는 경우, 동작에 때한 정확한 이해가 없으면 코드의 흐름을 따라가기 어렵다.
// 자바스크립트 내부의 비동기 동작을 이해하기 위해서는 이벤트 루프 등의 개념을 알아야 한다.


// 자바스크립트 엔진은 하나의 메인 스레드로 구성된다.
// 메인 스레드는 코드를 읽어 한 줄씩 실행한다.
// 브라우저 환경에서는 유저 이벤트를 처리하고 화면을 그린다.


// 동기적 제어 흐름은 현재 실행 중인 코드가 종료되기 전까지 다음 줄의 코드를 실행하지 않는 것을 의미한다.
// 분기문, 반복문, 함수 호출 등이 동기적으로 실행된다.
// 코드의 흐름과 실제 제어 흐름이 동일하다.
// 싱글 스레드 환경에서 메인 스레드를 긴 시간 점유하면, 프로그램을 멈추게 한다.


// 동기적 제어 흐름

{
  let a = 10;
  console.log("a : ", a);

  function foo(num) {
    for (let i = 0; i < 10; ++i) {
      console.log(num);
    }
  }

  foo(num);
}
// 위의 예제와 같은 종류들이 있다.


// 비동기적 제어 흐름은 현재 실행중인 코드가 종료되기 전에 다음 라인의 코드를 실행하는 것을 의미한다.
// 프로미스, 콜백 함수를 호출하는 함수 등은 비동기적으로 실행된다.
// 코드 흐름과 실제 제어 흐름이 다르다.
// 비동기 작업을 기다리는 동안 메인 스레드는 다른 작업을 처리한다.

{
  let a = 10;

  setTimeout(function callback() {
    console.log('a : ', a);
  }, 3000); // 3초의 지연시간을 가지므로 3초후에 출력된다.

  console.log('Finished'); // 먼저 출력된다.
} 


// * 이벤트 루프


// 자바스크립트 엔진은 비동기 처리를 제공하지 않는다.
// 대신, 비동기 코드는 정해진 함수를 제공하여 활용할 수 있다.
// 이 함수들을 API라 한다.
// 비동기 API의 예시로, setTimeout, XMLHttpRequest, fetch 등의 Web API가 있다.
// node.js의 경우 파일 처리 API, 암호화 API 등을 제공한다.


{
  // 타이머 비동기 처리
  setTimeout(() => console.log('타이머 끝'), 1000);
  setInterval(() => console.log('인터벌 타이머'), 1000);

  // 네트워크 처리
  fetch('https://google.com')
    .then(() => console.log('네트워크 요청 성공.'))
    .catch(() => console.log('네트워크 요청 실패.'));
}


// 비동기 코드를 처리하는 모듈은 자바스크립트 엔진 외부에 있다.
// 이벤트 루프(event loop), 태스크 큐(task queue), 잡 큐(job queue) 등으로 구성된다.
// API 모듈은 비동기 요청을 처리 후 태스크 큐에 콜백 함수를 넣는다.
// 자바스크립트 엔진은 콜 스택이 비워지면, 태스크 큐의 콜백 함수를 실행한다.


{
  requestAnimationFrame("user-data", (userData) => { // 콜백함수는 비동기 처리 함수이다.
    console.log("userData 로드");
    saveUsers(userData);
  });

  console.log("DOM 변경");
  console.log("유저 입력");
}


// * Promise


// Promise API는 비동기 API 중 하나이다.
// 태스크 큐가 아닌 잡 큐(Job queue, 혹은 microtask queue)를 사용한다.
// 잡 큐는 태스크 큐보다 우선순위가 높다.


{
  setTimeout(() => {
    console.log("타임아웃 1");
  }, 0);

  Promise.resolve().then(() => console.log("프로미스 1"));

  setTimeout(() => {
    console.log("타임아웃 2");
  }, 0);

  Promise.resolve().then(() => console.log("프로미스 2"));
  
  // 프로미스 1 프로미스 2
  // 타임아웃 1 타임아웃 2
}


// 비동기 작업을 표현하는 자바스크립트 객체.
// 비동기 작업의 진행, 성공, 실패 상태를 표현한다.
// 비동기 처리의 순서를 표현할 수 있다.
// Pending 상태에서 진행의 성공 또는 실패를 표현할 수 있다.


{
  // 프로미스 생성자
  let promise = new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      return reject("실패");
    }
    resolve(10);
  })
}
// callback 함수는 (resolve, reject) 두 인자를 받는다.
// Promise가 성공했을 때 resolve를 호출한다.
// Promise가 실패했을 때 reject를 호출한다.
// 두 인자를 합쳐서 settle 이라고 한다.


{
  // promise 메서드
  promise
    .then(data => {
      console.log("성공:", data); // 성공 시 data 콜백함수 호출
    })
    .catch(e => {
      console.log("실패:", e); // 실패 시 e 콜백함수 호출
    })
    .finally(() => {
      console.log("promise 종료"); 
    })
}


{
  // promise 메서드 체인
  promise
    .then(data => {
      return fetchUser(data);
    })
    .then(user => {
      console.log('User : ', user);
    })
    .catch(e => {
      console.log("실패:", e)
    })
} 
// then/catch 메서드가 또 다른 promise를 리턴하여, 비동기 코드에 순서를 부여한다.
// 이렇게 동일한 객체에 메서드를 연결할 수 있는 것을 체이닝(chaining)이라 한다.
// 함수를 호출한 주체가 함수를 끝낸 뒤 자기 자신을 리턴하도록 하여 구현한다.


// promise의 정적메서드

{
  Promise
    .resolve(10)
    .then(console.log)

  Promise
    .reject("Error")
    .catch(console.log)
}
// Promise.resolve 함수는 성공한 Promise를 바로 반환한다.
// Promise.reject 함수는 실패한 Promise를 바로 반환한다.


{
  Promise.all([
    promise1,
    promise2,
    promise3,
  ])
    .then(values => {
      console.log("모두성공:", values);
    })
    .catch(e => {
      console.log("하나라도 실패:", e)
    })
}
// Promise.all은 Promise의 배열을 받아 모두 성공 시 각 Promise의 resolved 값을 배열로 반환한다.
// 하나의 Promise라도 실패할 시, 가장 먼저 실패한 Promise의 실패 이유를 반환한다.