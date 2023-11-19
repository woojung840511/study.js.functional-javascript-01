/**
 * ## 기존과 달라진 ES6에서의 리스트 순회
 * - for i++
 * - for of
 */


// 기존 ES5에서의 리스트 순회
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
    // log(list[i]);
}

// 유사배열 역시 동일한 방식으로 순회했었다.
const str = 'abc';
for (var i = 0; i < str.length; i++) {
    // log(str[i]);
}


// ES6에서의 리스트 순회
// 문법이 훨씬 간결해졌고, 선언적이다.
// 어떻게 순회를 할지 명령적으로 기술하기보다는,
// 순회할 대상의 프로토콜을 따르는 객체라면 순회할 수 있다는 사실을 이용한다.
for (const a of list) {
    // log(a);
}
for (const a of str) {
    // log(a);
}