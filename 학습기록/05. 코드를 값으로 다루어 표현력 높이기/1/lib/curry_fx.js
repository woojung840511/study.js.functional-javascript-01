const log = console.log;

/**
  curry
    함수를 값으로 다루면서
    원하는 시점에 평가를 할 수 있게 하는 기법

 인자가 원하는 개수만큼 들어왔을 때 받아둔 함수를 실행시키는?
 */


const curry = f => // 함수를 받아서 일단 함수를 리턴한다
  // 리턴하는 함수에서 사용할 인자를 대신해서 받고 있다. (a, ..._)
  (a, ..._) =>
      // 이 함수의 인자가 2개 이상 전달되었을 때 (인자가 2개 이상이면 _에 값이 들어있을 것이다)
        // 받아둔 함수를 실행시킨다. f(a, ..._)
        // 만약 아니라면, 받아둔 함수를 리턴한다. (..._) => f(a, ..._)
          // (..._) => f(a, ..._)  미리 받아놨던 인자(a)와 새로 받는 인자들(..._)을 합쳐서 받아둔 함수를 실행시킨다.
      _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
