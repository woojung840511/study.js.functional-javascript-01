/**
 * 자바스크립트는 Array, Set, Map을 통해 순회할 수 있는 자료구조를 제공한다.
 * 이들은 모두 이터러블 프로토콜을 따르고 있다.
 *
 * ## 이터러블/이터레이터 프로토콜
 * - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 메서드를 가진 값
 * - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
 * - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 *
 */




log('Arr -----------');
const arr = [1, 2, 3];

/**
 * Symbol.iterator 라는 심볼이 있다.
 * 이 심볼은 이터러블 프로토콜을 따르는 값이 가지고 있는 심볼이다.
 * 이 심볼은 어떤 객체의 키로 사용될 수 있다.
 */
// arr의 Symbol.iterator 키에 무엇이 있는지 확인해보자.
//  어떤 함수가 들어있다고 나온다.
log(arr[Symbol.iterator]); // f values() { [native code] }

// 아래 주석을 풀면 Symbol.iterator키로 접근할 수 있었던 함수를 null로 만들어버린다.
// 이터러블 프로토콜을 따르지 않게 된다. --> for...of 순회를 할 수 없게 된다.
// arr[Symbol.iterator] = null;

// arr의 Symbol.iterator 키에 있는 함수를 실행해보자. Array 이터레이터를 반환한다.
let iter1 = arr[Symbol.iterator]();

// Array 이터레이터는 next() 메서드를 가지고 있다.
// next() 메서드를 실행하면 { value, done } 객체를 반환한다.
// value는 순회하고 있는 값이고, done은 순회가 끝났는지를 나타낸다.
// 순회가 끝났다면 done은 true가 된다.
// 순회가 끝났다면 value는 undefined가 된다.
// 순회가 끝났는데도 next()를 호출하면 done은 true이고 value는 undefined가 된다.
log(iter1.next()); // { value: 1, done: false }
log(iter1.next()); // { value: 2, done: false }
log(iter1.next()); // { value: 3, done: false }
log(iter1.next()); // { value: undefined, done: true }

// next()호출했을 때와 마찬가지로 for...of 구문을 통해 순회할 수 있다.
// for...of 구문은 Symbol.iterator를 통해 이터레이터를 가져오고, next()를 통해 순회한다.
// 순회가 끝나면 done이 true가 되고, for...of 구문은 순회를 멈춘다.
// for...of 구문은 순회가 끝나면 자동으로 이터레이터를 종료시킨다.
// for...of 구문운 next()를 호출하고 value를 꺼내는 것을 반복한다.
for (const a of iter1) log(a);

var iter2 = arr[Symbol.iterator]();
log(iter2.next());
for (const a of iter2) log(a); // 위에서 next()를 호출했기 때문에 1부터 시작한다.



log('Set -----------');
const set = new Set([1, 2, 3]);

// set의 Symbol.iterator 키에 함수를 갖고 있다.
log(set[Symbol.iterator]);

var setIter = set[Symbol.iterator]();
log(setIter.next()); // { value: 1, done: false }
log(setIter.next()); // { value: 2, done: false }
log(setIter.next()); // { value: 3, done: false }
log(setIter.next()); // { value: undefined, done: true }

// set은 이터러블 프로토콜을 따르기 때문에 for...of 구문을 통해 순회할 수 있다.
for (const a of set) log(a);




log('Map -----------');
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

// map의 Symbol.iterator 키에 함수를 갖고 있다.
log(map[Symbol.iterator]);

var mapIter = map[Symbol.iterator]();
log(mapIter.next()); // { value: [ 'a', 1 ], done: false }
log(mapIter.next()); // { value: [ 'b', 2 ], done: false }
log(mapIter.next()); // { value: [ 'c', 3 ], done: false }
log(mapIter.next()); // { value: undefined, done: true }

// map.keys() 라는 함수도 이터레이터를 반환한다.
var mapKeyIter = map.keys();
log(mapKeyIter.next()); // { value: 'a', done: false } // next()를 호출하면 value에 키만 담는다.
for (const a of map.keys()) log(a); // for...of 구문을 통해 키를 순회할 수 있다.

// map.values() 라는 함수도 이터레이터를 반환한다.
var mapValueIter = map.values();
log(mapValueIter.next()); // { value: 1, done: false } // next()를 호출하면 value에 값만 담는다.
for (const a of map.values()) log(a);

// map.entries() 라는 함수도 이터레이터를 반환한다.
var mapEntryIter = map.entries();
// next()를 호출하면 value에 키와 값이 담긴 배열을 담는다.
log(mapEntryIter.next()); // { value: [ 'a', 1 ], done: false }
// next()를 호출하면 value에 키와 값이 담긴 배열을 담는다.
for (const a of map.entries()) log(a);




// 확인을 해보면 이터레이터로 만든 것이 또 심볼 이터레이터를 가지고 있다.
var it = map.values();

// 이터레이터로 만든 것이 또 심볼 이터레이터를 가지고 있다. --> for...of 구문을 통해 순회할 수 있다.
// 실행했을 때 자기 자신을 그대로 반환하는 심볼 이터레이터를 가지고 있다.
log(it[Symbol.iterator]() === it); // true

let it2 = it[Symbol.iterator]();
it2.next(); // { value: 1, done: false }
