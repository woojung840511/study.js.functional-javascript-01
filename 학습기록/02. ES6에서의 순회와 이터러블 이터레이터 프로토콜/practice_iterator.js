const lottoSelector = {
    // numSet : new Set(), // 이터레이터 구현 메서드에서 이 값을 읽지 못함. 왜일까요?

    // [Symbol.iterator] <-- 문법을 찾아봐야하지만 [] <-- 이렇게 감싸는 의미가 무엇일지 궁금해졌습니다.
    [Symbol.iterator]() {
        const numSet = new Set(); // 반환된 이터레이터에서 이 값을 알고 있습니다. 클로저일까요??
        return {
            clear() { // next() 말고 다른 메서드도 정의할 수 있었습니다!
                numSet.clear();
                return "cleared";
            },
            next() {
                const randomNum = () => Math.floor(Math.random() * 45) + 1;
                let num;
                do {
                    num = randomNum();
                } while (!numSet.add(num));

                return numSet.size > 6 ? {done : true} : { value : num, done  : false}
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    },
}

const lottoIter = lottoSelector[Symbol.iterator]();
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.clear()) // next() 말고 다른 메서드도 정의가 가능했음
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());