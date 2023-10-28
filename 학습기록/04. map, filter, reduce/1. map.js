
const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
];

/**
 # map
 */

// 함수형 프로그래밍. 계산으로 코드를 구성한다.
// 어떤 값을 수집할 것인지 함수로 정의했다. 인자 f
const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
};

// let names = [];
// for (const p of products) {
//   names.push(p.name);
// }
// log(names);

log(map(p => p.name, products));

// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }
// log(prices);

log(map(p => p.price, products));