const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
  log('call take');
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    log('take > loop : a=', a);
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const takeAll = take(Infinity);

const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

L.map = curry(function* (f, iter) {
  log('call L.map')
  for (const a of iter) {
    console.log('map > loop : a =', a);
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  log('call L.filter');
  for (const a of iter) {
    if (f(a)) console.log('filter > loop : a =', a); yield a;
  }
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a));

var add = (a, b) => a + b;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};