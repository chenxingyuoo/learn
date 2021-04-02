function fibonacci() {
    let a = 0
    let b = 1
    return function () {
        let tempb = a + b

        a = b
        b = tempb
        return a
    }
}

const f = fibonacci()

console.log(f())
console.log(f())
console.log(f())
console.log(f())
console.log(f())
console.log(f())