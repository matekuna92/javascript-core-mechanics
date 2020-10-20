/* BASIC IMPORT */

// file1
export let projectId = 15;
export let projectName = 'Project1';

// file2
import { projectId, projectName } from './file1.js';
console.log(`${projectName} has the id of: ${projectId}`);
// Project1 has the id of: 15

// a változók átnevezhetők, ekkor az eredeti változó undefined
// ha egyszer átnevezzük, utána ezt az elnevezést kell használnunnk
import { projectId as id, projectName } from './file1.js';
console.log(`${projectName} has the id of: ${id}`);
console.log(projectId); // runtime error: projectId is undefined

// default kulcsszóval megadható, melyik változó kerüljön 
// exportálásra alapértelmezetten. Ilyenkor a {}-t elhagyjuk 

// file1
export let projectId = 15;
export let projectName = 'Project1';
export default projectName;

// ez is valid syntax
export { projectId as default, projectName};

// file2 - Nincs {} !!
import value from './file.js';
console.log(value); // Project1

// minden változó importálása
import * as values from './file1.js';
console.log(values);  // { projectId: 15, projectName: 'Project1' }

// a beimportált változók csak olvashatok
import { projectId } from './file1.js';
projectId = 200;
console.log(projectId); // runtime error: projectId is read-only

// ahogyan eddig is, ha egy objektum read-only, maguk az objektum
// propertyk módosíthatók

// file1
export let obj = {
  productId: 15
};

// file2
import { obj } from './file.js';
obj.productId = 20;
console.log(obj.productId); // 20

/* Ha importálok egy objektumot egy modulból, és módosítom az objektum property-jét a másikban, a 2 modul szinkronban marad, így a másik modulban is változik az érték */

// file1
export let obj = {
  productId: 15
};

function showId()
{
  console.log(obj.productId);
}

// file2
import { obj, showId } from './file1.js';
obj.productId = 200;
showId();   // 200
console.log(obj.productId);  // szintén 200

/* sync 2. példa - a ShowProject mint kifejezés csak egy név, melyet importálunk (Named Exports), ha változik az eredeti modulban, akkor ezután már a megváltozott érték jelenik meg a másik modulban is */

// file1
export function showProject()
{
  console.log('in original function');
}

export function updateFunction()
{
  showProject = function()
  {
    console.log('in updated function');
  }
}

// file2 
import { showProject, updateFunction } from './file1.js';
showProject();    // in original function 
updateFunction();
showProject();    // in updated function


/* ES6 CLASSES */

class myClass
{
}

// nincs külön class típus, minden class egy function-nak tekinthető
let example = new Myclass();
console.log( typeof example); // function
console.log(example instanceof myClass);  // true

/* object literal-lal ellentétben itt nincs szükség a function 
kulcsszóra class-on belül. 
constructor function megadható class-on is, a példányosítás
során automatikusan lefut */

class Task
{
  constructor()
  {
    console.log('Task constructed');
  }

  showTask()
  {
    console.log('My task');
  }
}

/* ugyanúgy, mint ES5-ben, a function(class) prototype objektumon
megjelenik a Class-on definiált function.

A class-ok nem hoist-olhatók, nem példányosítható előbb, mint ahogy definiáltuk a class törzsét
 */

let task = new Task();  // Task constructed
task.showTask();  // 'My task
console.log(task.showTask === Task.prototype.showTask); // true

// class-ok hozzárendelhetők változókhoz

let newClass = class Task {
  constructor()
  {
    console.log('Task constructed');
  }
}

new newClass(); // Task constructed

// class-ok esetén nem hívható meg a call() function, hogy 
// módosítsuk a this kontextusát, mint ES5-ben a constructor function-öknél

// class létrehozásakor a class nem kerül automatikusan a globlális namespace-be, mint az ES5 constructor function-ök esetén

function Project() {}
console.log(window.Project === Project);  // true

class newClass {}
console.log(windwo.newClass === newClass);  // false

/* EXTENDS AND SUPER - CLASS INHERITANCE */

class Project
{
  constructor()
  {
    console.log('this is a project');
  }
}

class smallProject extends Project
{
}

let p = new Project();  // this is a project

// super

class Project
{
  constructor()
  {
    console.log('this is a project');
  }
}

class smallProject extends Project
{
  constructor()
  {
    super();  // this is a project, ez fut le elsőnek példányosításkor
    console.log('small project!');  // small project!
  }
}

let pr = new smallProject();
// ha a super() sort kitörlöm, errort kapok,
// ha a smallProject-nek is van konstruktora ezt kötelező meghívni.
// ha nem akarjuk meghívni, akkor ki kell hagyni a constructort
// a smallProject-ben

//metódus öröklődés

class Project
{
  showNumber()
  {
    return 50;
  }
}

class bigProject extends Project
{
  // super is használható metóduson belül:
  /*
    showNumber()
    {
      return super.showNumber() + 5;
    }
   */
}

// a bigProjectnek ugyan nincs ilyen metódusa, de örökli a szülő classtól
// ha a bigProject class-ban is lenne ilyen metódus, az felülírja az örökölt metódust
let project = new bigProject();
console.log(project.showNumber());  // 50

// propertyk Class esetén -> this keyword class-on belül

class Project
{
  constructor()
  {
    this.projectName = 'Project Name';
  }
}

class bigProject extends Project
{
  constructor()
  {
    super();
// a super miatt hozzáférünk a projectName propertyhez
  //  this.projectName = this.projectName + ' 2';  // 2
  }
}

let p = new bigProject();
console.log(p.projectName); // Project Name

/* static metódusok - közvetlenül a Class-hoz tartozó metódusok, példányosításnál nem öröklődnek */

class myClass
{
  static showName()
  {
    console.log('My name');
  }
}

myClass.showName(); // My name

let c = new myClass();
c.showName(); // c.showName is not a function

// property-re nem használható a static, property-t 
// class.property = 15 módon adunk a classhoz
myClass.number = 50;
console.log(myClass.number);  // 50

/* SYMBOL - szimbólumok - egyedi ID generálása a cél, amihez
sosem férünk hozzá - felhasználása: pl. iteratorok-nál 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol */

let s1 = new Symbol('symbol 1');
let s2 = new Symbol('symbol 1');

console.log(s1 === s2);   // false, új szimbólum jön létre

// Symbol.for - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for

let s3 = Symbol.for('symbol 1');
let s4 = Symbol.for('symbol 1');
let st5 = Symbol.for('symbol 2');
console.log(s3 === s4); // true
console.log(s3 === s5); // false

// Symbol.keyFor
let s1 = Symbol.for('symbol 1');
let s2 = Symbol.keyFor(s1);
console.log(s2);  // symbol 1, a stringet kapjuk vissza, az id-hez nem férhetünk hozzá

// Symbol leggyakoribb felhasználása: class vagy object property-jeként
// (iterators, generators -nál pl.)

let article = {
  title: 'Article Title',
  [Symbol.for('article')]: 'My first article'
}

// property értékét rendeljük hozzá a változóhoz
// anélkül hasznláhatjuk az objektum property-jét, hogy pontosan tudnánk, mi az. Ehelyett Symbo-l-t használunk -> iterators, generators-nál hasznos
let value = article[Symbol.for('article')];
console.log(value); // 'My first article
console.log(Object.getOwnPropertyNames(value)); // ['title']

/* ITERATOR, GENERATOR, PROMISE */

// Iterator - egy object, amivel bejárható tömb, object vagy akár string is 

// Generator - egy function, ami vissza tud térni a hívó function-höz
// a végrehajtás közben

/* Promise - egy Object, amely valamilyen aszinkron műveletre vár,
általában ez egy network access vagy timer */

/* ITERATORS */

// a tömb rendelkezik egy új property-vel, amihez hozzá kell férnünk
// a property egy szimbólum, típusa function
/* ez a Symbol-ok egyik fő szerepe, hogy property-ket adhassunk hozzá
tömbökhöz, Class-okhoz, miközben biztosított, hogy a property name egyedi A Symbol.iterator pedig biztos hogy egyedi lesz, mivel Symbol */

let ids = [1000, 2000, 3000];
console.log(typeof ids[Symbol.iterator]); // function

/* az iteratoron meghívható a next() függvény, amely egy speciális objektum.
2 propertyje van: egy done: true / false, és egy value, ami mindig a következő értéket tartalmazza a tömbből a fenti példa esetén 
*/

// () !!! . mivel a tömb property-je function típust adott vissza,
// futtatható is ez a függvény. Ezen meghívható a next() eljárás
// 

let iter = ids[Symbol.iterator](); 
console.log(iter.next()); // {done: false, value: 1000} 
iter.next();
iter.next();  // {done: false, value: 3000}
console.log(iter.next()); // {done: true, value: undefined} - itt ér véget az iterator, nem az utolsó értéknél !

/* GENERATOR - iterator által meghívott function, amely csak akkor fut, ha szükséges. 
Többször meghívható, és többször képes megállítani, majd folytatni a kódot. Nem létezik a stack-en, mint a hagyományos funcion-ök 

Amikor futtatunk egy generator function-t, az eredmény egy iterator objektum
*/

function *process()
{
  yield 10;
  yield 20;
}

// a function a yield utasításnál megáll, és kiírja az értéket
let proc = process();
console.log(proc.next()); // {value: 10, done: false}

/* általában nem hard-coded értékekkel dolgozunk, hanem a generator 
function pl. egy ciklusban mindig egy új id-t ad vissza */

function *process()
{
  let id = 200;
  
  while(true)
  {
    yield(id++);
  }
}

/* A for of loop iterator alapú */

for(let id of process())
{
  if(id>205)
    break;

  console.log(id);
  console.log(process().next()); // mindig 200, mivel nem léptünk a következő elemre next()-tel
}

/* Eredmény: 
200
{value: 200, done: false}
201
{value: 200, done: false}
202
{value: 200, done: false}
203
{value: 200, done: false}
204
{value: 200, done: false}
205
{value: 200, done: false}
*/

// 2

function *noYield()
{
  yield;
}

let pr = noYield();
console.log(pr.next()); // {done: false, value: undefined}

// 3

function *proc()
{
  let result = yield;
  conosle.log(`Result is ${result}`);
}

let proc = proc();
proc.next();    // {done: false, value: undefined} -> először meg kell hívni, egyébként a következő sor is done false, value undefined
proc.next(50);  // Result is 50

// array in generator

function *arrGen()
{
  let arr = [yield, yield, yield];
  console.log(arr[2]);
}

let gen = arrGen();
gen.next();   // meghívjuk a generátort
gen.next(2);  // 0. tömbelem értéke 2
gen.next(15); // 1. tömbelem értéke 15
gen.next(100);    // 2. tömbelem értéke 100, csak ezt logoljuk ki

// eredmény: 100

// 4

function *gen()
{
  yield 40;
  yield [1,2,3];
}

let g = gen();
console.log(g.next().value);  // 42
console.log(g.next().value);  // [1,2,3]
console.log(g.next().value);  // undefined, generator is complete

// hogyan tudnánk kiiratni a tömb egyes elemeit a teljes tömb helyett?
// generator használata a tömbnél is, bejárhatóvá tesszük 

function *gen()
{
  yield 40;
  yield* [10, 11, 12];  // yield* - iterator delegation
  /* A yield* megkap valamit, ami bejárható(pl. tömb) és 
  lecseréli a gen iteratorát erre az iterator-ra. Így a tömb elemei is egyenként bejárhatók
  Így létrehozhatunk több iterator-t egy generátorhoz. Miután a "belső" iterátor befejeződött, visszatérünk az eredetihez
   */
}

let g = gen();
console.log(g.next().value);  // 40
console.log(g.next().value);  // 10
console.log(g.next().value);  // 11
console.log(g.next().value);  // 12
console.log(g.next().value);  // undefined

/* Throw and return */

function *test()
{
  try
  {
    yield 20;
    yield 21;
    yield 22;
  }
  catch(e)
  {

  }
}

// a generator catch ága elkapja, de nem csinál semmit ebben a példában az error-ral. Mivel már errort dobtunk, a done: true értéket fog kapni

let t = test();
console.log(t.next().value);  // 20
console.log(t.throw('error'));  // {value: undefined, done: true}
console.log(t.next());  // {value: undefined, done: true}

// ha try-catch nélkül hívom meg a throw-t, annál a sornál megáll a kód futása. a throw()-nak átadott paraméterstring lesz az error neve:

function *test2()
{
    yield 20;
    yield 21;
    yield 22;
} 

let t2 = test2();
console.log(t2.next().value);  // 20
console.log(t2.throw('errorName')); // Exception: errorName(execution terminates) 

/* Try-catch nélkül is folytatódhat a program futása throw után a return() segítségével */

let t2 = test2();
console.log(t2.next().value);  // 20
console.log(t2.return('returnError'));  // {value: 'returnError', done: true} 
// mivel return-t hívtunk, így a 21 és 22 értékhez sosem fogunk elérni
console.log(t2.next()); // már befejeződött az előző sorban az iterator -> {value: undefined, done: true}

