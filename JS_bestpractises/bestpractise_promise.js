/* PROMISE - ASYNC patterns, Promise objektum - https://www.promisejs.org/ script src - böngészőkben alapértlemezetten nem elérhetők a Promise-ok, NodeJS-ben már igen */

/* 1. - a háttérben a callback function-öket hívjuk meg */
function asyncMethod(message, cb)
{
  setTimeout(function()
  {
    console.log(message);
    cb();
  }, 500);
}

// christmas tree code - callback hell
asyncMethod('Open DB connection', function()
{
  asyncMethod('Validate user', function()
  {
    asyncMethod('Log in user', function()
    {
      // ...
    })
  })
});

/* 2. - Promise object - still christmas tree */

function asyncMethodPromise(message)
{
  return new Promise(function(fulfill, reject)
  {
    setTimeout(function()
    {
      console.log(message);
      fulfill();
    }, 500);
  })
}

asyncMethodPromise('Open DB connection')
.then(function()
{
  asyncMethodPromise('Validate user')
  .then(function()
  {
    asyncMethodPromise('Log in user')
    .then(function()
    {
      asyncMethodPromise('Do stuff')
      .then(function(){})
    })
  })
})

/* kiszervezni a kódrészleteket function-ökbe - jobb olvashatóság */

function validateUser()
{
  return asyncMethodPromise('Validate user')
}

function loginUser()
{
  return asyncMethodPromise('Log in user')
}

function doStuff()
{
  return asyncMethodPromise('Do stuff')
}

asyncMethodPromise('Open DB connection')
  .then(validateUser)
  .then(loginUser)
  .then(doStuff)
  .then(function(){});