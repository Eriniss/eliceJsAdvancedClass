{
  let o = {
    name: "Daniel",
    age: 23,
    address: "Street",
    job: "Software Enginner",
  };

  let o2 = { ...o, name: "Tom", age: 24 }; // ...가 스프레드 오퍼레이터다. 스프레드 뒤의 데이터가 앞의 o 객체의 데이터를 덮어 씌우게 된다.

  let o3 = { name: "Tom", age: 24, ...o }; // ...이 뒤에 위치하게 되면 스프레드된 o 객체가 o3를 덮어 씌우게 된다.

  console.log(o2.age); // 24
  console.log(o3.name); // Daniel
}