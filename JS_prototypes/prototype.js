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

/* A hibaüzenetek miatt is ajánlott strict módot használni. Sok esetben a JS nem dob hibát alapértelmezetten, ami félreértést okozhat */

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