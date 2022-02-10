const { performance } = require('perf_hooks');

const size = 45;

// normal recurssive function that calculates the n'th Fibonacci number
function fibRegular(n) {
    if (n <= 1)
        return 1;
    return fibRegular(n-1) + fibRegular(n-2);
}

var calculatedResults = new Array(size).fill(0);

calculatedResults[0] = calculatedResults[1] = 1;



// dynamicly prohgrammed reccursive function that returns the n'th Fibonacci number by saving past calculations and uses them when needed for future operations
//                                        fib(5) 
//                                    /            \
//                                 /                   \
//                             /                          \
//                          /                                \
//                       /                                      \
//                    /                                            \
//                 /                                                   \
//              /                                                          \
//        fib(3)                                                      fib(4)
//      /       \                                                   /       \
//    fib(1)    fib(2)                                          fib(2)     fib(3)
//    /          /     \                                         /              \
// known 1    fib(0)    fib(1)                              DSavedValue 2      Dsaved 3
//            /             \                               3 ops saved        4 ops saved 
//           known 1       known 1
//
//       in the example above we've saved 7 recurssive function calls but had to touch the memory while doing so,
//       thats why when under the 30'th or so fibonacci number we'll rather do all the calculations to ramin within
//       the cpu lower level cache instead of using the higher levels or even the RAM which would be much slower than 
//       those small caches
function fibDynamic(n) {
    if (calculatedResults[n] !== 0)
        return calculatedResults[n];
    calculatedResults[n-1] = fibDynamic(n-1);
    calculatedResults[n-2] = fibDynamic(n-2);
    return calculatedResults[n-1] + calculatedResults[n-2];
}


function fibBest(n){
    if(n < 28){
        return fibRegular(n);
    } else {
        return fibDynamic(n);
    }

}

const startTime = performance.now()
console.log(fibDynamic(size-1))
const endTime = performance.now()
console.log(`Call to fibDynamic took ${endTime - startTime} milliseconds`)

const startTime1 = performance.now()
console.log(fibRegular(size-1))
const endTime1 = performance.now()
console.log(`Call to fibRegular took ${endTime1 - startTime1} milliseconds`)

const startTime2 = performance.now()
console.log(fibBest(size-1))
const endTime2 = performance.now()
console.log(`Call to fibBest took ${endTime2 - startTime2} milliseconds`)
