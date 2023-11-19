/**
 제너레이터의 활용
 홀수만 발생시키는 제너레이터
 */

const log = console.log;

// limit: 10

function* odds(l) {
    for (let i = 0; i < l; i++) {
        if (i % 2) {
            yield i;
        }
    }
}

let iter = odds(10);
log('odds(10)');
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 3, done: false }
log(iter.next()); // { value: 5, done: false }
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next()); // { value: undefined, done: true }

// 무한히 값을 리턴하는 제너레이터
// 무한히 값을 리턴할 수 있지만,
// next()로 평가할 때까지만 동작한다.
// 때문에 while(true) 라고 작성한다고 해도 프로그램이 멈추거나 하는 일은 없다.
function *infinity(i = 0) {
    while (true) yield i++;
}

const iterInf = infinity();
log('infinity()');
log(iterInf.next()); // { value: 0, done: false }
log(iterInf.next()); // { value: 1, done: false }
log(iterInf.next()); // { value: 2, done: false }
log(iterInf.next());
log(iterInf.next());

// 무한 제너레이터를 이용해서 odds()를 구현할 수 있다.
function *odds2(l) {
    for (const i of infinity(1)) {
        if (i % 2) yield i;
        if (i === l) return;
    }
}
iter = odds2(10);
log('odds2(10) - infinity()를 이용해서 odds()를 구현');
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 3, done: false }
log(iter.next()); // { value: 5, done: false }
log(iter.next()); // { value: 7, done: false }



function *limit (l, iter) {
    for (const i of iter) {
        yield i;
        if (i === l) return;
    }
}

iter = limit(4, [1, 2, 3, 4, 5, 6]);
log('limit(4, [1, 2, 3, 4, 5, 6])');
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 2, done: false }
log(iter.next()); // { value: 3, done: false }
log(iter.next()); // { value: 4, done: false }
log(iter.next()); // { value: undefined, done: true }



function *odds3(l) {
    for (const i of limit(l, infinity(1))) {
        if (i % 2) yield i;
        if (i === l) return;
    }
}

iter = odds3(10);
log('odds3(10) - limit()과 infinity()를 이용해서 odds()를 구현');
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 3, done: false }
log(iter.next()); // { value: 5, done: false }
log(iter.next()); // { value: 7, done: false }
log(iter.next()); // { value: 9, done: false }
log(iter.next()); // { value: undefined, done: true }

for (const a of odds3(40)) {
    log(a);
}


/**
 제너레이터는 이터러블/이터레이터 프로토콜을 따르고 있기 때문에
 for of,
 전개 연산자, 구조 분해, 나머지 연산자 등과 함께 사용할 수 있다.
 */

log('전개연산자')
log(...odds(10));
log([...odds(10), ...odds(20)]);

log('구조분해, 나머지 연산자')
const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
