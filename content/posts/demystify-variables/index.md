---
title: "Demystify Variables"
date: 2019-08-18T18:13:41+02:00
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript]
series: "Demystify Programming Languages"
description: In this post, we will talk about variables in programming languages.
---

For now our simple programming language (PL) have two operations (`+`, `-`), two types (`number`, `symbol` - at this point everything that is not number, for example `a`, `b`, `+`, `-`, etc.). The next feature we want to add is "variable".

## What is variable?

There are many sides to this question. So let's start with the simplest point of view of what variable can be.

The variable is temporary storage. Imagine if you need to calculate some complex formula, you will do this in small portions and you will write down intermediate result or memorize it (if your memory is good enough). Variables allow us to store some intermediate result of the calculation. Generally speaking, it allows to store any information, it can be user input or some predefined constant values, etc.

Variable has a name (or identifier) which we use to distinguish them. In our language, we will use symbols for variables. We already have symbols in our PL, for now, we use them to denote operations. We will extend the usage of symbols to denote variables as well.

## What we omit?

As I said this is a simplified version of variables implementation, so we omit some subjects, for example,

- local scope vs global scope (we will use global one for now)
- call by value vs call by name
- reassignment, referential transparency (we don't allow reassignment for now)
- references, pointers

## How it will work?

We need to implement two operations:

- write - to save the value
- read - to get the value

 usage of write, read words may confuse you in the future because we will discuss input-output (IO) and writing to IO, reading from IO is a bit different thing. We can call "write" - memory allocation and assignment in one action.

Write will be implemented as an operation which takes two values - name of the variable and value. We will use the word `define` for this operation. In our case it will look like this:

```lisp
(define x 1)
```

In other languages it can look like this, for example:

```other
x = 1
x := 1
const x = 1
```

The read will take only one value - the name. For simplicity, we will not use any explicit operators to read, instead of whenever we meat symbol other than some special case we will substitute a value for it (stored previously). This way it will resemble mathematical notation:

```lisp
(+ x 1)
```

## Implementation

We said that we store variables in some storage, aka memory. If you would read some book about how to implement compiler you may also meat other names for it: stack (saving in the stack), heap (saving in heap).

In the context of PL, we will call it **environment**. Every operation (or program) executes is some context, some environment.

We need some data structure capable of storing pairs `(name, value)`. The simplest solution may be storing a list of pairs:

```js
[["x", 1], ["y", 2] ...]
```

But it would be not very comfortable to work with - we will need to iterate through the list each time to compare name that we want to find with the name in the pair.

It would be nice if we can use the same principle as they use in the dictionary - you use the word as "address" and get an explanation about the word based on it.

There is such a data structure. It is called a dictionary or hash table. It is subject for a separate post on how to implement it. For now, let's see how it works in JS:

```js
const environment = {};
// define
environment["x"] = 1;
// read
environment["x"];
```

Let's add `define` to `evaluate`:

```js
const environment = {};
const evaluate = ast => {
  let [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
  if (name === "+") {
    // ...
  } else if (name === "-") {
    // ...
  } else if (name === "define") {
    return (environment[first] = second);
  } else {
    throw new RuntimeError(`"${name}" is not a function`);
  }
};
```

Let's add read "operartion":

```js
const environment = {};
const evaluate = ast => {
  if (typeof ast === "string") {
    return environment[ast];
  } else if (typeof ast === "number") {
    return ast;
  }
  let [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
  if (name === "+") {
    return evaluate(first) + evaluate(second);
  } else if (name === "-") {
    // ...
  } else if (name === "define") {
    // ...
  } else {
    throw new RuntimeError(`"${name}" is not a function`);
  }
};
```

At this point we should be able to do:

```other
> (define x 1)
1
> (+ x 1)
2
```

The basic implementation is in place, but there is more...

## Caveats

### Eval value

We should be able to do:

```lisp
(define x (+ 1 1))
```

To support this we need to add `evaluate` to the second argument:

```js
if (name === "define") {
  return (environment[first] = evaluate(second));
}
```

_Note_: think about why we `evaluate` the second argument, but not the first one.

### Symbols only

What should happen if we do:

```lisp
(define 1 2)
```

It doesn't make sense. To prevent this we need to check if the first argument is a symbol and respond with an error in case it is not:

```js
if (name === "define") {
  if (typeof first !== "string") {
    throw new TypeError(
      `"${name}" expects symbol as the first argument, instead got "${first}"`
    );
  }
  return (environment[first] = evaluate(second));
}
```

### Reassign

What should happen if we do:

```other
> (define x 1)
> (define x 2)
```

There are two possible ways to respond to this:

- allow reassignment, so the value, in the end, would be `2`
- make variable produced with `define` behave as constant e.g. we can't change the value after it was defined the first time.

I chose the second option:

```js
if (name === "define") {
  if (typeof first !== "string") {
    throw new TypeError(
      `"${name}" expects symbol as the first argument, instead got "${first}"`
    );
  }
  if (environment[first] !== undefined) {
    throw new RuntimeError(`Can't redefine "${first}" variable`);
  }
  return (environment[first] = evaluate(second));
}
```

### Special symbols

What should happen if we do:

```lisp
(define + 1)
```

it can get very confusing:

```other
> (+ + +)
2
```

We don't want that, so let's prohibit this behviour:

```js
if (name === "define") {
  if (typeof first !== "string") {
    throw new TypeError(
      `"${name}" expects symbol as the first argument, instead got "${first}"`
    );
  }
  if (
    environment[first] !== undefined ||
    first === "+" ||
    first === "-" ||
    first === "define"
  ) {
    throw new RuntimeError(`Can't redefine "${first}" variable`);
  }
  return (environment[first] = evaluate(second));
}
```

_Note_: think about why we handle special keywords in the same manner as other environment variables.

### Undefined values

What should happen if we do:

```lisp
(+ x y)
```

and we never defined `y`? As we talked in the [previous post](/content/posts/demystify-programming-languages-errors/index.md) there are two ways to handle errors:

- return some value which indicates an error, for example, `undefined` or `null`
- interrupt current execution

I chose second option:

```js
if (typeof ast === "string") {
  if (environment[ast] === undefined) {
    throw new RuntimeError(
      `Can't find "${ast}" variable. Use \`(define ${ast} ...)\` to define it`
    );
  }
  return environment[ast];
}
```

### Undefined defined values

What should happen if we do:

```lisp
(+ + +)
```

At the moment it will result in:

```other
Can't find "+" variable. Use `(define + ...)` to define it
```

but when we will do as it says

```lisp
(define + 1)
```

it will result in

```other
Can't redefine "+" variable
```

I don't think there would be a developer who would want to use special symbols as variables, so let's not worry about that.

We kind of silently introduced 3-rd type (`function` as value), which is not usable at the moment but shows itself in this weird behavior.

## Tests

The current implementation isn't easy to test, because it uses a global variable (`environment`). Let's fix that, by adding a second (optional) argument to `evaluate`

```js
const evaluate = (ast, environment = {}) => {
  //...
  let [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
  if (name === "+") {
    return evaluate(first, environment) + evaluate(second, environment);
  } else {
    // ...
  }
};
```

Now we can write tests:

```js
const assert = require("assert");

let testEnv = {};
assert.equal(evaluate(parse("(define x 1)"), testEnv), 1);
assert.equal(testEnv["x"], 1);

assert.equal(evaluate(parse("(+ x x)"), { x: 1 }), 2);

try {
  evaluate(parse("(+ x x)"), {});
} catch (e) {
  assert.equal(
    e.message,
    'Can\'t find "x" variable. Use `(define x ...)` to define it'
  );
}

try {
  evaluate(parse("(define 1 1)"), {});
} catch (e) {
  assert.equal(
    e.message,
    `"define" expects symbol as the first argument, instead got "1"`
  );
}

try {
  evaluate(parse("(define x 1)"), { x: 1 });
} catch (e) {
  assert.equal(e.message, `Can't redefine "x" variable`);
}

testEnv = { y: 1 };
evaluate(parse("(define x y)"), testEnv);
assert.equal(testEnv["x"], 1);

try {
  evaluate(parse("(define x x)"));
} catch (e) {
  assert.equal(
    e.message,
    'Can\'t find "x" variable. Use `(define x ...)` to define it'
  );
}

try {
  testEnv = {};
  evaluate(parse("(define + 1)"), testEnv);
  // we don't want this to be valid program
  evaluate(parse("(+ + +)"), testEnv);
} catch (e) {
  assert.equal(e.message, `Can't redefine "+" variable`);
}
```

## PS

Source code for this post is [here](https://github.com/stereobooster/write-a-language/tree/master/03.variable).

Guess what. Next subject would be functions, closures, and scopes.
