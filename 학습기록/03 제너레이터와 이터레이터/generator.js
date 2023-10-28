/**

 # 제너레이터/이터레이터
 제너레이터:
 이터레이터이자 이터러블을 생성하는 함수
 이터레이터를 리턴하는 함수
 제너레이터는 일반함수에서 별을 붙여서 만든다
 제너레이터는 순회할 값을 문장으로 표현하는 것이라고도 말할 수 있다.
 */
const log = console.log;

function *gen() {
    yield 1;
    yield 2;
    yield 3;
    return 100; // 제너레이터의 리턴값은 이터레이터의 value에 담긴다.
}

let iter = gen();
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next()); // { value: 100, done: true }

// iter 이터레이터는 이터러블이자 이터레이터이기도 하다.
log(iter[Symbol.iterator]);

// 심볼 이터레이터의 실행 결과는 자기 자신
log(iter[Symbol.iterator]() === iter);

// 제너레이터의 실행결과가 이터레이터이자 이터러블이기 때문에 아래와 같이 순회할 수 있다.
for (const number of iter) {
    log(number);
}


// 제너레이터는 순회할 값을 문장으로 표현하는 것이라고도 말할 수 있다.
// 제너레이터를 통해 어떠한 값도 순회할 수 있는 이터러블이 될 수 있다.
function *gen2() {
    yield 1;
    if (false) yield 2;
    yield 3;
    return 100; // 제너레이터의 리턴값은 이터레이터의 value에 담긴다.
}

iter = gen2();
log(iter.next());
log(iter.next());
log(iter.next());