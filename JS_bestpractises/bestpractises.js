/* variables */
var myVar = 10;

function func()
{
  var myVar;
  myVar = 15; 
}

func();
console.log(myVar);

/* functions, function expressions - hoisting */

myFunc();
function myFunc()
{
  console.log('Hey from myFunc!');
}

newFunc();
/* expression is not a function error !! */
/// expression();   // expression is not a function !

/* function expression().... --> így nem kapunk hibát az expression() kifejezésre -> a compiler először a deklarációkat ellenőrzi, majd a megfelelő eljárásokat futtatja. 

function expression() esetén talál expression nevű function kifejezést. 
var expression = function() esetén viszont nem létezik function declaration, csak egy expression nevű változó, ami undefined. Ha a hozzárendelés után használom az expression() kifejezést, akkor nincs error.
*/

var expression = function()
{
  console.log('Hey from expression');
}

console.log(expression);  // ƒ expression()

function newFunc()
{
  console.log('Hey from newFunc!');
}

expression();

// BEST PRACTISE: A script elején mindig a változókat, függvény deklarációkat adjuk meg, és ezek után használjuk őket!


/************************************/

var toPrint = 'Text to print';

function print(out)
{
  // ha elhagyom a var szót a változó előtt, akkor automatikusan globális változók lesznek. Ez problémát okozhat.
  'use strict';
  stringToPrint = out;
  console.log(stringToPrint);
}

// console.log(stringToPrint); - Error: stringToPrint is not defined
/// print('Hello');
//console.log(stringToPrint);

/* A fenti problémára megoldás: 'use strict'; -> ne globálisan használjuk, mert akkor mindenre érvényes, ehelyett a szükséges function-ön belül!. strict módban hibát kapunk, ha egy változó nincs deklarálva var vagy let kulcsszóval, így elkerülhető a véletlen elhagyásuk */

/* 1. gyakorlati példa - A hibaüzenetek miatt is ajánlott strict módot használni. Sok esetben a JS nem dob hibát alapértelmezetten, ami félreértést okozhat */

'use strict';
let obj = {};

Object.defineProperty(obj, 'readOnly', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: 'This is read only'
})

console.log(obj.readOnly);

/* nem kapunk errort, de nem is történt meg a módosítás! use strict módban : cannot assign to readOnly property of Object error */ 
obj.readOnly = 'Modified text';
console.log(obj.readOnly);

/* 2. gyakorlati példa - delete esetén nem kapunk errort, mikor törlés után íratunk ki, a JS próbál a háttérben tovább futni, hogy ne törjön el a program, így viszont nem egyértelmű a működés */

/* delete of unqualified identifier error in strict mode */
'use strict';
let object = {a: 10, b: 20};
let myVarr = 'teszt';

delete object.a;
delete myVarr;
delete object;

console.log(object);
console.log(myVarr);

/* a delete keyword csak objektumból való törlésre jó, nem törölhető objektum, vagy változó vele. Strict mód nélkül úgy tűnik működik, de nem csinál semmit a háttérben */

/* 3. gyakorlati példa */

function get(a,b,a)
{
  //   'use strict'; --> duplicate parameter error
  console.log(a);
}

get(1,2,3); // use strcit nélkül: 3

/* 4. gyakorlati példa */

let obj2 = {
  a: {
    b: {
      c: 'hello'
    }
  }
}

console.log(obj2.a.b.c);  // nagy objektumok esetén ez átláthatatlan -> with utasítás

var c = 'this is important';

with(obj2.a.b)
{
  console.log(c);   // nem egyértelmű, pontosan mi C értéke, ezért deprecated, nem használjuk már a with-et
}

// Megoldás: IIME - paraméterként átadva az objektum c property-jét, így már egyértelmű, hogy melyik értékkel dolgozunk, megőrizve az aktuális scope-ot

(function(newVar)
{
  console.log(newVar);
}(obj2.a.b.c));

/************ THIS **************/

let o1 = {
  val:  'Hey from o1',
  printVal: function()
  {
    console.log(this.val);
    console.log(this);
    /* strict módban print() esetén a this nem jelentene semmit, undefined errort kapunk, strict nélkül viszont a globális Window objectet */
  }
}

let o2 = {
  val:  'Hey from o2',
}

o1.printVal();

o2.printVal = o1.printVal;
o2.printVal();

/* a this mindig az aktuális objektumra vonatkozik, amelyen belül meghívtuk a függvényt. a print esetén "nincs a pont bal oldalán semmilyen objektum" amihez bind-olhatnám a this-t, így undefined értéket kapunk. Ha kilogolom az o1 objektum function-ben a this-t, látható, hogy a Window objektumot kapom */

let printt = o1.printVal;
printt();

// bind - megadhatok scope-ot, mihez tartozzon a this kifejezés
/* Az o1.printVal-t bind-olom az o2 objektumhoz, így 'Hey from o2'-t kapom a print2() eredményeként */
let print2 = o1.printVal.bind(o2);
print2();

/* this in Objects, with setTimeout */

let newObj = function()
{
  this.hello = 'Hello';
  this.greet = function()
  {
    console.log(this.hello);
  }

  this.delayedGreeting = function()
  {
    setTimeout(this.greet, 1000);
  }
}

let greeter = new newObj(); // new nélkül a this a global objektumra utal, undefined-ot kapunk
greeter.greet();
greeter.delayedGreeting();  /* undefined !!!

Miért? -> a setTimeout a let print2 = o1.printVal.bind(o2);
sorhoz hasonlóan működik: setTimeout = (callbackFunction, val){ cb() }
Nincs hozzárendelés, hanem a setTimeout változó maga egyenlő az aktuális függvénnyel. Így a this a globális objektumra utal ismét */

// Megoldás: a this-t mindig az aktuális objektumhoz kell hozzárendelni, így a this a setTimeout-ot belül is tudni fogja, hogy az aktuális objektumra kell mutatnia, és nem veszik el a scope

let newObj2 = function()
{
  let _this = this;
  _this.hello = 'Hello, now with _this';
  _this.greet = function()
  {
    console.log(_this.hello);
  }

  _this.delayedGreeting = function()
  {
    setTimeout(_this.greet, 1000);
  }
}

let greeter2 = new newObj2();
greeter2.delayedGreeting();














