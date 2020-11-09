---
title: "Is this a type error?"
date: 2020-11-09T22:20:40+01:00
draft: false
tags: [programming, computerscience, type-system, function]
cover_image: is-this-a-pigeon.jpg
---

## What is a type error?

Let's say this is an error when the operation is applied to the value of the wrong type. For example, **is division by zero a type error**? 

If we define division type signature as **`(Number, Number) -> Number`** than it is not a type error. But on the other hand, the division is a partial function e.g. it is not defined for all possible inputs (denominator can't be zero). So to make the proposed type signature work we need to throw an exception (for undefined behavior). Example in Python:

```python
print(1/0)
# ZeroDivisionError: integer division or modulo by zero
```

If we define division type signature as **`(Number, Number) -> Number | Undefined`**, we could use `Undefined` to represent the undefined behavior of the function. Now there is no exception nor type error when we call the function with zero, but instead, we need to do a "type check" of the result:

```ts
if (result != Undefined) {
  // now we know that result is Number
}
```

If we define division type signature as **`(Number, NumberExceptZero) -> Number`**, we will make division by zero a type error.

## Edge case handling 

...in partial functions

### Exception

Type signature: **`divide :: (Number, Number) -> Number`**

Throwing exception would make types correct because instead of getting an "undefined" value we will jump to a different branch of code, which means that function will either return the correct value or consequent instructions will not run.

```ts
try {
  result = divide(a, b);
  // `result` type is: Number
  print(c + 1);
} catch {
  // handle error
}
```

Example in Ponylang:

```pony
let result =
  try
    USize.max_value().div_partial(0)?
  else
    // handle error
  end
```

For get item (from array at index) example in Python:

```python
from array import *
myArray = array('i', [10,20,30,40,50])
print (myArray[10])
# IndexError: array index out of range
```

### Undefined

Type signature: **`divide :: (Number, Number) -> Number | Undefined`**

Return special value for undefined behavior.

```js
result = divide(a, b);
// `result` type is: Number | Undefined
if (result == Undefined) {
  // handle error
} else {
  // Now we know that `result` type is: Number
  print(c + 1);
}
```

For division, it can be `NaN` (not a number) or `Infinity`. From language PoV, they can be considered as numbers, but from math PoV, they are not.

Example in Ponylang (it returns tuple `[Number, Boolean]` instead of `Number | Undefined`):

```pony
let result =
  match USize.max_value().divc(0)
  | (_, true) =>
    /* handle error */
  | (let temp: USize, false) =>
    temp + 1
  end
```

For get item (from array at index) it can be `undefined` or `null`. Example in JavaScript:

```ts
let myArray = [10, 20, 30, 40, 50];
myArray[10]; // undefined
```

### Monad

Type signature: **`divide :: (Number, Number) -> Either<Error, Number>`**

We can use `Either` monad for the division.

```ts
result = divide(a, b);
// `result` type is: Either<Error, Number>
result.bimap(
  () => {
    /* handle error */
  },
  (temp) => { // `temp` type is Number
    print(temp + 1); 
  }
);
```

We can use `Maybe` monad for "get item". Example in Elm:

```elm
myArray = Array.fromList [10,20,30,40,50]
Array.get 10 myArray -- Never
```

### Dependent types

Type signature: **`divide :: (Number, NumberExceptZero) -> Number`**

We can define more precise types of functions. For example, allow only non-zero numbers as a second parameter for the division.

```ts
// `b` type is Number
if (b == 0) {
  /* handle error */
} else {
  // `b` type is Number except 0
  result = divide(a, b);
  print(result + 1);
}
```

Pay attention: error handling is done before division - to prove to type checker that `b` is not zero.

### Comparison table

|                 | division                                    | get item from array at index                         |
| --------------- | ------------------------------------------- | ---------------------------------------------------- |
| Exception       | `(Number, Number) -> Number`                | `(Array<P>, Number) -> P`                            |
| Undefined       | (Number, Number) -> Number \| Undefined     | (Array\<P\>, Number) -> P \| Undefined                 |
| Monad           | `(Number, Number) -> Either<Error, Number>` | `(Array<P>, Number) -> Maybe<P>`                     |
| Dependent types | `(Number, NumberExceptZero) -> Number`      | `(Array<P>, Numbers from 0 to List.length - 1) -> P` |

**Note**: one more way to handle division is [1/0=0](https://www.hillelwayne.com/post/divide-by-zero/)

## Thoughts

- If an exception is used to compensate for undefined behavior of partial function it can be represented with types instead
- If the given exception is a type error or not depends on how types defined

 