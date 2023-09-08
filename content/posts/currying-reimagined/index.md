---
title: "Currying reimagined"
date: 2020-11-30T23:29:50+01:00
draft: false
tags: [function, javascript, programming]
---

## What is currying?

> Currying is the process of transforming a function that takes multiple arguments in a tuple as its argument, into a function that takes just a single argument and returns another function which accepts further arguments, one by one
>
> -- https://wiki.haskell.org/Currying

E.g. it's process of converting funtion like that:

```js
const func = (x, y, z) => [x, y, z];
func(1, 2, 3) === [1, 2, 3];
```

to

```js
const func = (x) => (y) => (z) => [x, y, z];
func(1)(2)(3) === [1, 2, 3];
```

Other way to see it is those two representation are equivalent. As well as those:

```js
const func = (x, y) => (z) => [x, y, z];
const func = (x) => (y, z) => [x, y, z];
```

Which brings us to "auto-currying" or partial application. Imagine if you provided not enough arguments for a function call, like this

```js
const func = (x, y, z) => [x, y, z];
func(1, 2);
```

The system can automatically transform function to equivalent function, which takes the required number of arguments and call it with given arguments

```js
// original function transformed to (x, y) => (z) => [x, y, z];
// where x = 1 and y = 2
// so the final version is (z) => [1, 2, z];
func(1, 2)(3) === [1, 2, 3];
// the same as
func(1)(2, 3) === [1, 2, 3];
```

**Historical note**:
Currying and curried functions are named after Haskell B. Curry. While Curry attributed the concept to Schönfinkel, it had already been used by Frege (citation needed).

## Practical usage

From practical point of view partial application requires less boilerplate (less closures). For example, if we have following code:

```js
// Let's assume we have a sort function similar to this
const sort = (comparator, arr) => arr.sort(comparator);
// but we can't change implementation, for example, 
// imagine it works with a linked list instead of JS array
const sortIncrementaly = (arr) => sort((x, y) => x - y, arr);
```

With partial application this code requires less boilerplate:

```js
const sortIncrementaly = sort((x, y) => x - y);
```

## Discomfort points

Currying and partial application have the following discomfort points:

1. It relies on positional arguments e.g. `(1, 2, 3)` instead of named arguments `(x: 1, y: 2, z: 3)`
2. It needs the "subject" argument to be the last one in the list of arguments

Positional arguments are hard to remember (especially if there are more than 2 of them). For example, without looking into the manual, can you tell what the second argument stands for:

```js
JSON.stringify(value, null, 2);
```

It is easier to work with named params:

```js
JSON.stringifyNamedParams({ value, replacer: null, space: 2 });
```

Functions with the "subject" argument, in the end, works better for currying. For example, lodash'es and underscore's `map` function:

```js
_.map(arr, func);
```

doesn't work with `_.curry` out of the box. There is `_.curryRight` and `_.curry` with placeholders. It would work better if arguments would be another way around (`_.map(func, arr)`).

## Reimagine

Currying, as idea, came from math, which has rigid idea of function. In programming we have more "free" definition. We can have:

- optional arguments: `(x, y = 2) => ...`
- varied length of arguments: `(x, ...y) => ...`
- named arguments: `({ x, y }) => ...`

How would currying work for named params?

```js
const func = ({ x, y, z }) => [x, y, z];
const curriedFunc = curry(func);
curriedFunc({ x: 1 })({ y: 2 })({ z: 3 }); // [1, 2, 3]
curriedFunc({ z: 3 })({ y: 2 })({ x: 1 }); // [1, 2, 3]
curriedFunc({ z: 3, y: 2 })({ x: 1 }); // [1, 2, 3]
// ...
```

There are no problems to remember the order of arguments. Arguments can be partially applied in any order.

**Just for fun I implemented this function in JavaScript**: [source code](https://github.com/stereobooster/curry-experiment)

## Feedback?

Would you use the partial application more if it would be natively supported in your programming language? 