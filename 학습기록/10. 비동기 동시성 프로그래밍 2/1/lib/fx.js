const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const isIterable = a => a && a[Symbol.iterator];

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduceF = (acc, a, f) =>
  a instanceof Promise ?
    a.then(a => f(acc, a), e => e == nop ? acc : Promise.reject(e)) :
    f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

/*
// 원래 있었던 함수
const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then(a => (res.push(a), res).length == l ? res : recur())
          .catch(e => e == nop ? recur() : Promise.reject(e));
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  }();
});*/

// take 변경하기
// 기존 : 문제파악하기
/*
  const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;  // 여기서 꺼낸 a 가 promise 인 경우에 대응해야 한다.
      res.push(a);          // promise 안의 값을 꺼내서 push를 해야한다.
      if (res.length == l) return res;
    }
    return res;
  });
*/

// 수정
/*
  const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();

    // 수정하기 2) 재귀호출을 위해 유명함수로 만들었다.
    return function recur() {
      let cur;
      while (!(cur = iter.next()).done) {
        const a = cur.value;  // 여기서 꺼낸 a 가 promise 인 경우에 대응해야 한다.
        log('take > recur > while : cur = ', a);

        // 수정하기 1)
        if (a instanceof Promise) return a.then(a => {
          res.push(a); // 꺼내서 넣기
          if (res.length === l) return res;

          // 수정하기 2)를 하기 전 고민
          // l에 당도하지 못했을 경우에는 -> 다시 while 문을 순회해야한다.
          //      하지만 이미 return 을 한 상황이라 while 문으로 돌아가기 어렵다.
          //      이런 부분을 코딩할 때에는 재귀를 할 부분을 선택해서 잘라서 유명함수 즉시실행 기법을 사용하면 된다.

          // 수정하기 3) 재귀호출
          //    다시 while 문을 순회할 수 있도록 한다.
          return recur();
        })
        res.push(a);
        if (res.length == l) return res;
      }
      return res;
    } ();
  });
*/

// 코드 간결하게 정리하기
const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();

  return function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      log('take > recur > while : cur = ', a);

      if (a instanceof Promise) return a.then(
          a => (res.push(a), res).length  === l ? res : recur()
          // 쉼표 연산자 사용 - 쉼표 연산자는 각각의 피연산자를 왼쪽에서 오른쪽 순서로 평가하고, 마지막 연산자의 값을 반환합니다.
          // 삼항식으로 정리
      )

      res.push(a);
      if (res.length === l) return res;
    }
    return res;
  } ();
});

const takeAll = take(Infinity);

const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

// L.map 변경하기
L.map = curry(function* (f, iter) {
  for (const a of iter) {
    // yield f(a); // 변경전

    // go1로 변경
    //    Promise로 된 iterable 한 객체를 받을 수 있게 됐다.
    yield go1(a, f);
  }
});

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
    else if (b) yield a;
  }
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a));

const flatten = pipe(L.flatten, takeAll);

const flatMap = curry(pipe(L.map, flatten));

var add = (a, b) => a + b;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
