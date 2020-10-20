// let, const, block scoping
'use strict';
let id;
console.log(id);  // undefined értéket kap, ha nem deklaráljuk

console.log(id2); // ReferenceError: id2 is not defined
let id2 = 5;

let id3 = 10;
console.log(id3); // 10, helyes használat, let esetén nincs hoisting

//
let name = 'name1';

function getName()
{
  let name = 'name2';
}

console.log(name);  // ha a külső name-et törlöm, name is not defined error

//
function updateAge()
{
  age = 25;
}

let age = 20;
updateAge();    // age = 20 után fut le, 25-öt kapunk.
// ha a function-ön belül let-et használok, akkor 20-at kapunk vissza, az előző példa alapján
console.log(age);

//
let updateFunctions = [];
for(var i=0; i<2; i++)
{
  // a tömb minden eleme egy function, ami i-vel tér vissza
  updateFunctions.push(function() { return i; });
}

console.log(updateFunctions[0]());  // 0 helyett 2-t kapunk. i körül egy closure jön létre, a ciklus végén pedig i=2, tehát a function mindig 2-vel tér vissza. let-et használva minden iteráció saját i értékkel rendelkezik , így a [0] elem 0 lesz, stb.

// a fenti működés hasonló a jól megszokott esethez: a cikluson kívül kérem el az i értékét, ami i<10 esetén ekkor már 10
/* let arr = [];
for(var i=0; i<10; i++)
{
    arr.push(i);
}

console.log(i); */

// CONST - const változó értéke nem írható felül később! A block scoping ugyanúgy érvényes, mint let esetén (if, for, stb-n belül)
const TEST = 'test';
console.log(TEST);
const TEST2;
console.log(TEST2); // undefined, deklarálni kell!

// ARROW FUNCTIONS - fő funkciója: a this kezelése, ES5-ben nem volt lehetőség 

// es5
var es5 = function(price)
{
  return price*2;
}

console.log(es5(10));

// es6
let es6 = price => price*3;
console.log(es6(10));

// function

// es5
document.addEventListener('click', function()
{
  console.log(this);  // document objektum
})

// es6 esetén a függvény a window object-et adja vissza - arrow function esetén a this nem az elemre vonatkozik, ami az event-et kapja, hanem a contextre, ahol a kód fut
document.addEventListener('click', () => { 
  console.log(this); 
}); 

// 2. példa - Object

var invoice = {
  number: 123,
  process: function()
  {
    console.log(this);
  }
}

invoice.process();  // Object {number: 123, process: ƒ}

//es6
var invoice2 = {
  number: 123,
  process: () => {
    console.log(this);
  }
}

invoice2.process(); // Window object

var invoice3 = {
  number: 123,
  process: function()
  {
    return () => console.log(this.number);
  }
}

invoice3.process()(); // return function futtatása

// arrow function esetén nem használható call, bind, és apply, a js engine egyszerűen figyelmen kívül hagyja ezeket az utasításokat

var newInvoice = {
  number: 456
}

console.log('after bind:');
invoice3.process().bind(newInvoice)();

// () szimbólummal deklarált function-ök esetén nincs hozzáférésünk a function prototype peroperty-jéhez

let showPrice = () => {
  console.log(showPrice.hasOwnProperty('prototype'));
}

showPrice();  // false

/* Default function Parameters */

let getProduct = function(productId = 999, type='software')
{
  console.log(productId + ' ' + type);
}

getProduct();
// undefined esetén a js az alapértelmezett értéket próbálja meg használni
getProduct(undefined, 'hardware');

//default érték definiálásakor elérhetünk a function-ön kívül lévő változókat, függvényeket is
let baseTax = 0.08;
let getTotal = function(price, tax = price * baseTax)
{
  console.log(price + tax);
};

getTotal(5);  // 5.4

let generateBaseTax = () => 0.08;
let totalPrice = function(price, tax = price * generateBaseTax())
{
  console.log(price + tax);
}

totalPrice(5);  // 5.4

// arguments.length -> figyelmen kívül hagyja a default paramétereket, és a ténylegesen átadott paraméterek számát adja megszokott
let fnc = function(name, age=25)
{
  console.log(arguments.length);
}

fnc('Dave');  // 1

// paraméter értékének használata deklarálás előtt
let tPrice = function(price = tax, tax = 0.08)
{
  console.log(price + tax);
}

tPrice(); // ReferenceError: Cannot access 'tax' before initialization

// ugyanez paraméterrel meghívva:
let totPrice = function(price = tax, tax = 0.08)
{
  console.log(price + tax);
}

totPrice(5);  // 5.08. Mivel adtunk meg értéket, nem kaptunk errort

// default paraméterek működnek dinamikus függvény létrehozásakor is
let total = new Function("price=2000", "return price;")
console.log(total()); // 2000

// REST és SPREAD 

// rest - putting parameters into a single array
// spread - spreading out elements of array

let showCategories = function(id, ...categories)
{
  console.log(categories);
}

showCategories(125);  // ha nincs paraméter átadva, akkor is egy üres tömb jelenik meg a categories
console.log(showCategories.length); //1, figyelmen kívül hagyja a rest paramétert

// rest paraméter is használható dinamikus függvény esetén is, mint a default paraméterek

let showCat = new Function('...categories', 'return categories;');
console.log(showCat('phone', 'speaker')); // ["phone", "speaker"]

// SPREAD

let prices = [1000, 5000, 12000];
let maxPrice = Math.max(...prices);
console.log(prices);
console.log(...prices);
console.log(maxPrice);đ

// 2 - tömb létrehozása értékek nélkül
let arr = [ ...[,,] ];
console.log(arr); // [undefined, undefined]

// spread operator stringgel
let maxCode = Math.max(...'423'); // 4 - a spread operator egyéni értékekre bontja a stringet, majd ebből adja vissza a legnagyobb értéket
console.log(maxCode);

// 3
let array = ['a', ...'bcd', 'e'];
console.log(array);  // ["a", "b", "c", "d", "e"]
console.log(...array);  // a b c d e

/* DESTRUCTURING */
