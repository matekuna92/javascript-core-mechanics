/* closure - the "ability" of functions to remember the lexical scope attached to them,
no matter where they are called */

function foo()
{
    var bar = "bar";

    function baz()
    {
        console.log(bar);
    }

    bam(baz);
}

// passing baz as parameter outside of function foo, where it was referenced, 
// we can still access the lexical scope of where it was defined, even though 
// it's executed outside of that scope
function bam(baz)   
{
    baz();  // "bar"
}

foo();

/* no matter how deep nested levels are, variables can reference 1, 2, any levels up within the same scope */
function foo()
{
    var bar = 0;

    setTimeout(function()
    {
        var baz = 1;
        console.log(bar++);

        setTimeout(function()
        {
            console.log(bar + baz);
        }, 200);
    }, 100)
}

foo();  // 0 2

//
// prints out 6 5 diffent times at every 1 seconds - closure problem! -> fix with let,
// so every iteration get its own 
// they are 5 different anonymous functions that are closing over the same ONE global scope.
// it's like we could write different timeouts 1 onto another

// i:6, i:6, i:6, i:6, i:6
for(var i=1; i<=5; i++)
{
    setTimeout(function()
    {
        console.log("i:", + i);
    }, i*1000)
}

// with let - i:1, i:2, i:3, i:4, i:5
for(let i=1; i<=5; i++)
{
    setTimeout(function()
    {
        console.log("i:", + i);
    }, i*1000)
}

// another solution: IIFE to create own scope for every iteration
// i:1, i:2, i:3, i:4, i:5
for(var i=1; i<=5; i++)
{
    (function(i)
    {
        setTimeout(function()
        {
            console.log("i:", + i);
        }, i*1000);
    })(i);
}



