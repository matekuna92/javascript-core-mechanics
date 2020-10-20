/* every function while executing has a reference to its own current execution context, called this 
always a reference to an object */

//
function foo()
{
    console.log(this.bar);
}

var bar = "bar1";
var o2 = {bar: "bar2", foo: foo};
var o3 = {bar: "bar3", foo: foo};

foo();  // bar1
o2.foo();   // bar2
o3.foo();   // bar3

//
function foo()
{
    var bar = "bar1";
    this.baz = baz; // this refers to global, there's already a function called baz, it's not a local reference
    this.baz();
}

function baz()
{
    console.log(this.bar);
}

var bar = "bar2";
foo();  // bar2

// call - explicit binding
function foo()
{
    console.log(this.bar);
}

var obj = {bar: "bar", foo: foo};
var obj2 = {bar: "bar2", foo: foo};

var orig = foo;
foo = function() { orig.call(obj) };    // hard binding

foo();  // bar
foo.call(obj2);     // still prints out bar, line 9 always forces the this binding to the OBJ,
// no matter how the function was called 

// new keyword with this

/* 4 thing happens when a new keyword is put before a function call 
1 - a new object will be created
2 - this new object gets linked to a different object
3 - the new object gets bound as the this keyword for the purposes of that function call
4 - if the function not otherwise returns anything, then it returns "this" the object itself
*/

function foo()
{
    this.baz = "baz";
    // "return this - 4th rule when new keyword is used"
    console.log(this.bar + " " + baz); /* there is no this.bar, when baz created with the new keyword
    with its own context.. baz is also undefined, this.baz would return "baz" instead */
}

var bar = "bar";
var baz = new foo();    // undefined undefined
// without new keyword this.bar would refer to global var, so console log prints: bar baz
console.log(baz.baz);   // baz* - after the function was assigned to the baz value,
// baz now has "baz" property, so the console shows the string as value
// *without new keyword at line 67 baz.baz cannot read property baz of undefined

// how to explicitly bind this -> call and apply methods




