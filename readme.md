@Cache()
---
#### A decorator for pure methods which improves performance
If you have a complicated method which is called many times and takes a long time you can just add `@Cache()` decorator to it.
```typescript
import { Cache } from 'ts-cache';

class ExampleClass {

    @Cache()
    method(count: number): number {
        console.log(`Execution with value: ${count}`);
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum++;        
        }
        
        return sum;
    }

}

const obj = new ExampleClass();

const res1 = obj.method(1000000); // Takes some time
const res2 = obj.method(1000000); // Instant execution
const res3 = obj.method(1000000); // Instant execution
const res4 = obj.method(9999999); // Takes some time

console.log(res1, res2);
console.log(`res1: ${res1}`);
console.log(`res2: ${res2}`);
console.log(`res3: ${res3}`);
console.log(`res4: ${res4}`);

/* Console output
   Execution with value: 1000000
   Execution with value: 9999999
   res1: 1000000
   res2: 1000000
   res3: 1000000
   res4: 9999999
*/
```
You can see that `obj.method()` was called twice but executed only once. Anyway we have the same result in both variables: `res1` and `res2`.
It's because every time when you call your method with the same arguments as once before it returns result instantly. `@Cache()` decorator just keeps it in memory.
>Be careful with `@Cache()` decorator. It may cause some unexpected behavior if your method need to be executed every time it's called.
