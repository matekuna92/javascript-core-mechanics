// lexical vs dynamic scope

/* FUNCTION SCOPE */

// 1
function startCar(carId)
{
    let message = 'Starting...';
}

startCar(123);
console.log(message);   //referenceError, variable dies, when the function executed

// 2
function startCar(carId)
{
    let message = 'Starting...';

    // if function cant find a variable, it looks for its parent function, so it finds "message" variable
    let startFn = function turnKey()
    { 
        console.log(message);
    };
    startFn();
}

startCar(123);  // Starting...

// 3
function startCar(carId)
{
    let message = 'Starting...';

    // if function cant find a variable, it looks for its parent function, so it finds "message" variable
    let startFn = function turnKey()
    { 
       let message = "Override...";
    };
    startFn();
    console.log(message);   // Starting..., inner message variable dies after startFn();
}

startCar(123);

/* BLOCK SCOPE */

// 1

if ( 5 == 5 )
{
    let message = "Equals";
}

console.log(message);   // referenceError

// 2 

let message = "Outside";

if ( 5 == 5 )
{
    let message = "Equals";
    console.log(message);   // Equals
}

console.log(message);   // Outside

// IIFE - before modules we had to isolate parts of codes to not to interfere with other parts: IIFE
// Immediately Invoked Function Expression - function will be called immediately
// usually we assign the function to a value, so WE CAN ACCESS FUNCTIONS WITHIN THAT MODULE

(function()
{
    console.log("IIFE");
})();

// always the return value gets assigned to the variable
let app = (function()
{
    let id = 333;
    console.log('in function');
    return {};
})();

console.log(app);   // {}

// Closure IIFE function-nel

let app = (function()
{
    let id = 333;
    
    let getId = function()
    {
        return id;
    }

    return {            // !!!
        getId: getId    // return a reference to the function, can be named differently
    }
})();

console.log(app.getId()); // 333

/* THIS keyword */
let fn = function()
{
    console.log(this === window);   // true, global object is the context of "this"
}

// usage
let o = {
    carId: 123,
    getId: function()
    {
        console.log(this);  // refers to the object { carId:123, getId: f }
        return this.carId;
    }
};

console.log(o.getId()); // 123

/* CALL, APPLY - changing the value of this 
change the object which is the context of the function */

// CALL
let o = {
    carId: 123,
    getId: function()
    {
        return this.carId;
    }
};

let newCar = { carId: 456 };

// how to execute getId on newCar? - this now refers to the newCar object 
console.log(o.getId.call(newCar));   // 456

// APPLY - similar to call, but can pass arguments
console.log(o.getId.apply(newCar, ['ID: '])); // ID prefix, console log result: ID: 456

// BIND - making a copy of the called function
/* call and apply calls existing function, bind makes a copy of the function(getId function here) */

let newFn = o.getId.bind(newCar);
console.log(newFn());

/* ARROW FUNCTIONS */
/* arrow functions dont have their own "this" value. this refers to the enclosing context */

let getID = () => 123;
console.log(getID());   // 123

//
let fn = prefix => prefix + 123;
console.log( fn('ID: ') );  // ID: 123
// if we have more than 1 parameter, we need paranthesis!

// if we use function body, we need return statement, else it will return as undefined
let fn = prefix => { 
    prefix + 123;   
}

console.log(fn());  // undefined

let fn = prefix => { 
    return prefix + 123;
}

console.log(fn('id: '));  // id: 123

/* DEFAULT PARAMETERS */
// before ES5 we couldn't give paramers a default value
// default parameters must be declared at the right side of parameter list

let trackCar = function(carId, city='NY')
{
    console.log(`Tracking ${carId} in ${city}.`);
}

console.log(trackCar(123)); // Tracking 123 in NY
console.log(trackCar(123, 'Chicago'));  // Tracking 123 in Chicago






















