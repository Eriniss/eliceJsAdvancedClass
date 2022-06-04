// 자바스크립트 코드의 실행 3

let o = {
  name: 'Daniel',
  method: function(number) {
    return this.name.repeat(number);
  }
};

function myFunc() {
  let n = 10;
  return console.log(o.method(n)); 
}

myFunc() // 'Daniel'이 10번 출력된다.