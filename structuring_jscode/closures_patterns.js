function myNonClosure()
{
    let date = new Date();
    return date.getMilliseconds();
}

function myClosure()
{
    let date = new Date();

    /* a date változó egy belső function-ben van hivatkozva. Ez egy closure-t hoz létre  date változó körül.
    Amíg a myClosure function scope-ban van, a date változó értéke nem változik */
    return function()
    {
        return date.getMilliseconds();
    };
}

let myClosure2 = function()
{
    let date = new Date();

    // privát function, csak a blokkon belül érhető el, ahova beágyaztuk, csak ha hivatkozunk rá 
    // egy return állításban, akkor érhető el kívülről
    let nestedFunction = function()
    {
        return date.getMilliseconds();
    }
    // megoldás: visszatérünk egy object literal-lal, amiben hivatkozunk a belső function-re.
    // myClosure2.nested() módon már elérhető a visszatérési érték
    // csak a return objektumban lévő változók, function-ok érhetők el kívülről, a fenti date változó pl. nem
    return {
        // hivatkozunk a belső function-re
        nested: nestedFunction
    }
}

// 1. eset

// a 2 érték eltér, mindig az aktuális időpontot írjuk ki, eddig OK
console.log(myNonClosure());
window.setTimeout(function()
{
    console.log(myNonClosure());
}, 1000);


// 2. eset

// a 2 eredmény egyezik, 
let clos = myClosure();
console.log(clos());
window.setTimeout(function()
{
    console.log(clos());
}, 1000);

// 3. eset

// a 2 érték itt is egyezik
let clos2 = myClosure2();
//console.log(clos2.nestedFunction());
console.log(clos2.nested());

window.setTimeout(function()
{
   // console.log(clos2.nestedFunction()); -> return nélküli, eredeti verzió, ami errort dob
   // testVariable.nestedFunction();  // testVariable.nestedFunction is not a function
   console.log(clos2.nested());
}, 1000);


// SCOPE 

function startCar(carId)
{
    let message = 'Starting...';
    let startFn = function turnKey()
    {
        let message = 'Override';
    }

    startFn();
    console.log(message);
}

startCar(123);  // Starting...

// 
let app = (function()
{
    let id = 333;
    console.log('in function');
    return {};
})();

console.log(app);

// Closure IIFE function-nel

let app = (function()
{
    let id = 333;
    
    let getId = function()
    {
        return id;
    }

    return {            // !!!
        getId: getId
    }
})();

console.log(app.getId()); // 333






