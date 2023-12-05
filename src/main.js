import { pi, power, Test } from './lib';

console.log(pi);
console.log(power(pi, pi));

const test = new Test();
console.log(test.foo());
console.log(test.bar());

console.log(
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  })
);

console.log(Object.assign({}, { x: 1 }, { y: 2 })); // {x: 1, y: 2}

console.log(Array.from([1, 2, 3], (v) => v + v)); // [2, 4, 6]
