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

let main = (() => {
    var _ref = _asyncToGenerator(function* () {
        // várakozunk, hogy a main function lefusson, mielőtt folytatnánk
        // az await kulcsszó elminálja a callback function-t, így nincs szükség a then-ekre, 
        //helyette, változóba mentjük function-t
        let one = yield asyncMethodPromise('Open DB connection', 0);
        let two = yield validateUser('Validate user', one); // felhasználjuk a változót a következő hívásban
        let three = yield loginUser('Log in user', two);
        let four = yield doStuff('Do stuff', three);
    });

    return function main() {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function asyncMethodPromise(message, num) {
    return new Promise(function (fulfill, reject) {
        setTimeout(function () {
            console.log(message + ' ' + num);
            fulfill(num + 1);
        }, 500);
    });
}
