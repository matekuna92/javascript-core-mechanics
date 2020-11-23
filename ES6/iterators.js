/* iterators are used to control the generator 
generator functions can be paused, stopped as many times as we want
without giving value when yield-ing, the iterator result will always returns undefined 
*/

function *main() {
    console.log('Hello World');
}

// constructs an iterator
let it = main();
it.next();  // hello
// return an iterator result, which has 2 property: value, and done (boolean)
// {value: undefined, done: true}

//
function *fn() {
    console.log('Fn function');
    yield;
    console.log('2nd log');
}

let fnIt = fn();
fnIt.next();    // "Fn function", {value: undefined, done: false}
fnIt.next();    // "2nd log", {value: undefined, done: true}

// yield and return values
function *fn2() {
    console.log('Fn2 function');
    yield 9;
    console.log('2nd log');
    return 10;
}

let fn2It = fn2();
fn2It.next();    // "Fn function", {value: 9, done: false}
fn2It.next();    // "2nd log", {value: 10, done: true}

for(let v of fn2()) {
    console.log(v);  // fn2 function 9 2nd log
    /* for loop said done: true, so we dont see any value that returns back 
    if we want to get 10 as well, change return to YIELD 
    Genrator can yield out as many values as we want */ 
}

//
function *fn3() {
    for(let i=0; i<5; i++) {
        yield i;
    }
}

for(let v of fn3()) {
    console.log(v); // 0 1 2 3 4
}

/* for of loop calling .next() each time. Generator pauses when it gets to the yield keyword, 
sending out a value if you yield something, and it waits forever until somebody calls .next() again */
/* for of loop and [...] operator automatically consume an iterator to completion...
they keep calling .next() on the iterator, until done becomes true */

/* Generator will return done:true, when it gets to the end and does a return */

