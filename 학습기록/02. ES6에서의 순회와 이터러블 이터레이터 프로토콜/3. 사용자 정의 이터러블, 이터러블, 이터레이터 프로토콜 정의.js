/**
 * ## 이터러블/이터레이터 프로토콜
 * - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
 * - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
 * - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 *
 * ### 사용자 정의 이터러블을 통해 알아보기
 *
 */


// for 구문으로 순회했을 때
// value로 3,2,1을 순서대로 출력하고 끝나는 이터러블을 만들어보자.
const iterable = {

    // Symbol.iterator 메서드를 구현해야 이터러블이 된다.
    // 질문: 메서드를 구현하는 문법이란
    [Symbol.iterator]() {

        let i = 3;

        // 이터레이터를 리턴한다.
        return {

            // next 메서드를 구현해야 이터레이터가 된다.
            next() {
                // next 메서드는 value와 done 프로퍼티를 가진 객체를 리턴한다.
                return i == 0 ? {done: true} : {value: i--, done: false};
            },

            // well-formed iterator : 자기 자신을 리턴하는 Symbol.iterator를 가지고 있어야 한다.
            // 1. 자신을 리턴하도록 해서 중간에 다시 한번 for...of 구문을 돌릴 수 있게 한다.
            // 2. 어디에서든 이전까지 진행되어 있던 상태를 유지하면서 순회를 다시 시작할 수 있게 한다.
            // --> 이터레이터도 이터러블이 되도록 한 것이다.
            [Symbol.iterator]() {
                return this;
            }
        }
    }
};

// 이제 iterable은 이터레이터를 반환할 수 있다.
let iterator = iterable[Symbol.iterator]();
iterator.next();
iterator.next();
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());

// 심볼 이터레이터가 들어가 있기 때문에 for...of 구문을 사용할 수 있다.
// a에 value가 할당되고, done이 true가 될 때까지 반복한다.
for (const a of iterator) log(a);

// 아직은 자바스크립트의 iterable iterator 프로토콜의 모든 속성을 구현하지 못했다.
// arr2 예제를 통해 살펴보자.
// arr2 처럼 잘 구현된 이터러블은 next()를 통해 진행하다가 for...of 구문을 통해 순회할 수도 있고,
// 이터레이터를 그대로 for...of 구문에 넣어도 순회할 수 있다.
const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
log(iter2.next());
for (const a of iter2) log(a);

// iter2 역시 Symbol.iterator를 가지고 있기 때문에 for...of 구문에 넣어도 순회할 수 있다.
log(iter2[Symbol.iterator]);

// 그리고 iter2[Symbol.iterator]()를 호출한 값은 자기 자신이다.
// 이렇게 이터레이터가 자기 자신을 반환하는 심볼 메서드를 가지고 있을 때
// -> well-formed iterator, well-formed iterable 이라고 할 수 있다.
log(iter2[Symbol.iterator]() === iter2);

// iterable iterator 프로토콜은 es6에서 지원하는 내장값만 이 프로토콜을 따르는 것이 아니다.
// 많은 오픈소스 라이브러리들이나 자바스크립트에서 순회가 가능한 형태의 가진 값들은 대부분 이 프로토콜을 따르고 있다.
// EX:
//  facebook 에서 만든 immutable.js 라이브러리 ( for...of 구문을 지원한다. )
//  lodash 에서 만든 lazy.js 라이브러리 ( for...of 구문을 지원한다. )
//  브라우저에서 사용할 수 있는 웹 api 중에도 이터러블/이터레이터 프로토콜을 따르는 것들이 있다.
//      EX: DOM의 NodeList, HTMLCollection, FormData, fetch의 Response 등
// 예제:
for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');

// all을 순회할 수 있는 이유
//  all이 배열이어서가 아니라, (배열이 아니라 NodeList이다.)
//  all이 Symbol.iterator가 구현이 되어 (= 즉 이터러블) 있기 때문이다.
log(all[Symbol.iterator]);

let iter3 = all[Symbol.iterator](); // 실행하면 이터레이터를 만든다.
log(iter3.next());
log(iter3.next());
log(iter3.next());