const foo = (num) => {
    return num % 2 == 0 ? ((num % 3) * 2) - 3 : 0;
}

console.log(foo(4));
console.log(foo(2));