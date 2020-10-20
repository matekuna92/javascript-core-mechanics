  /* régebbi böngészők támogatása, ES6 kód konvertálása kompatibilis ES5 kóddá Babel-lel */

// npm install -g babel-cli
// create new file: .babelrc -> json file:

/*
    {
        "presets": [
            "es2015"
        ],
        "plugins": []
    }
*/

// npm install --save-dev babel-preset-es2015
// babel index.js -o es6.js
// html-ben az es6.js-t kell behúzni

'use strict';

function asyncMethodPromise(message, num)
{
  return new Promise(function(fulfill, reject)
  {
    setTimeout(function()
    {
      console.log(message + ' ' + num);
      fulfill(num + 1);
    }, 500);
  })
}

async function main()
{
    // várakozunk, hogy a main function lefusson, mielőtt folytatnánk
    // az await kulcsszó elminálja a callback function-t, így nincs szükség a then-ekre, 
    //helyette, változóba mentjük function-t
    let one = await asyncMethodPromise('Open DB connection', 0);
    let two = await validateUser('Validate user', one); // felhasználjuk a változót a következő hívásban
    let three = await loginUser('Log in user', two);
    let four = await doStuff('Do stuff', three);
}



