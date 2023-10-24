const lottoSelector = {
    // numSet : new Set(), // 이터레이터 구현 메서드에서 이 값을 읽지 못함. 왜일까.

    [Symbol.iterator]() {
        const numSet = new Set(); // 반환된 이터레이터에서 이 값을 알고 있다. 클로저일까??
        return {
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
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
console.log(lottoIter.next());
