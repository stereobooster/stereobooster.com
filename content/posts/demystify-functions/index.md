---
title: "Demystify Functions"
date: 2019-08-23T22:11:57+02:00
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript, function]
series: "Demystify Programming Languages"
description: In this post, we will talk about functions in programming languages.
---

In [one of my previous posts](/posts/from-function-to-closure/) I talked about the theoretical point of view on functions. In this post, we will talk about how to implement function from scratch in a programming language.



This post is part of the series: in previous posts, we constructed small languages, which for now can do `+`, `-`, `define` (global scope variables). In this function, we will add `function` operation which will create a new function. We will add a new type (`function`) to the list of existing types (`symbol`, `number`).

## What we will cover?

This is learning exercise, which means that we will implement only limited functionality, for example, we will use dynamic variable resolution instead of lexical scope, we will not talk about recursion or stack overflow error or tail call optimization, we will not support closures yet (this is for the next post), evaluation strategy (we will use call by value for most of the time).

We will implement a function which will work like this:

```repl
> (define minus
    (function (x y)
      (- x y)))
> (minus 2 1)
= 1
```

e.g. `(function ...)` returns a function which we assign to a variable (`minus`) and later we can call it the same way as we can call built-in functions.

## Implementation

What does it take to create a function? We need 3 things

- keyword `function` which serves as a signal that this is expression is function declaration. Other Lisp flavors may use `lambda`, `λ` or `\` instead.
- list of function arguments
- body of the function

For example:

```lisp
;                 function body⤵
(define minus (function (x y) (- x y)))
;              arguments⤴
```

Function invocation will evaluate the body with an environment which will have variables named the same way as arguments e.g.

```lisp
(minus 2 1)
```

is the same as

```js
evaluate(parse(`(- x y)`), { x: 2, y: 1 });
```

**A function is sub-program (or routine) with some local variables**.

### Function as value

Function is a value, so we can asign it to variable:

```lisp
(define minus (function (x y) (- x y)))
```

If we can assign it to a variable, it means that we need to represent a function in some way storable in memory. How we will do it?

We can store is as list:

- first will be keyword "function" (tag)
- the second is the list of arguments
- the third is the body of the function

Hm... seems familiar 🤔. We can reuse AST of function as function representation

```js
const evaluate = (ast, environment = {}) => {
  // ...
  // function call handling
  let [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
  if (name === "+") {
    // ...
  } else if (name === "function") {
    return ast;
  } else {
    // ...
  }
};
```

We can detect function like this:

```js
const isFunction = ast => isList(ast) && ast[0] === "function";
```

### Function call

Let's add support for function calls. As we discussed earlier function call is just evaluation with aditional local variables:

```js
const evaluate = (ast, environment = {}) => {
  // ...
  if (name === "+") {
    return evaluate(first, environment) + evaluate(second, environment);
    //...
  } else {
    if (!isFunction(environment[name])) {
      throw new RuntimeError(`"${name}" is not a function`);
    }
    // take function and destructure it to arguments and body
    const [_, argumentNames, body] = environment[name];
    // assume all functions expect 2 arguments
    const functionEnvironment = {
      // take current environment
      ...environment,
      // add arguments to environment
      [argumentNames[0]]: evaluate(first, environment),
      [argumentNames[1]]: evaluate(second, environment)
    };
    // pass body and new environment to evaluate
    return evaluate(body, functionEnvironment);
  }
};
```

That is it. We implemented functions. Now let's talk about details.

### Local variables

Why do they call it local variables? The difference between local and global variables is that global variables are accessible everywhere (once defined), but local variables are only available inside the function.

For example:

```repl
> (define z 1)
= 1
> (+ z z)
= 2
```

It will return to 2.

```lisp
(define minus (function (x y) (- x y)))
```

As you can see we use `x` and `y` variables, that means they are defined (at least inside the function). Now if we try

```repl
> (minus 2 1)
= 1
> (+ x y)
```

it will throw an exception about undefined variables `x` and `y` because they don't exist globally.

Each function has its scope, but it contains all variable from the global scope.

### Variable shadowing

Let's see on more example:

```repl
> (define z 1)
= 1
> (define minuzzz (function (x y) (- (- x y) z)))
> (minuzzz 2 1)
= 0
```

As we can see `minuzzz` function has access to the global scope (`z` variable). This makes sense but what about this example

```repl
> (define x 1)
= 1
> (define minus (function (x y) (- x y)))
> (minus 2 1)
= 1
```

`x` exists globally and locally. In this case, local version "wins", this is called variable shadowing (local variable shadows global one).

### Dynamic resolution

What would happen if we will do:

```repl
> (define getFun
        (function (x y)
          (function (i j)
            (- (+ x y) (+ i j))
          )
        )
      )
> (define fun (getFun 5 4))
> (fun 3 2)
```

`getFun` is a function which returns a function. We assign to `fun` a function returned by `getFun` (with `x` and `y` substituted as 5 and 4 respectively).

I would expect `(fun 3 2)` to extend to the following expression `(- (+ 5 4) (+ 3 2))` or in arithmetic notation `((5 + 4) - (3 + 2))` and evaluate to `4`. But instead, it will result in error `Can't find "y" variable...`. This is because we use "dynamic" resolution, we don't preserve environments, there is one global environment and one function environment, but to support this case we need to save environment of each function when it was created and pass it around together with the function. The function passed together with an environment called closure, we will implement closures in the next post.

### Native functions

Now we can define functions in our language, we see that there is some difference between `+` and `-`, for example, and user-defined functions.

`+` and `-` use "native" functions e.g. capability of the underlying platform to perform the actual operation. If we would use assembly language instead of JS it could be some processor-specific instructions, for example:

Three-operand architecture (RISC - PowerPC)

```assembly
;A:= B+C
lwz r2, [num1]
lwz r3, [num2]
add r4,r3,r2
```

Two-operand architecture (CISC - x86)

```assembly
;A:=B
mov eax, [num1]
mov ebx, [num2]
;A:=A+B
add eax,ebx
```

[source of assembly snippets](https://www.quora.com/How-do-I-add-two-numbers-in-assembly-language/answer/Alexandre-Horst).

### Functions in environment

Now, when we can store user-created functions in the environment, we can think of storing some of the built-in functions in the environment as well, this way we can simplify code a bit.

We can move `+`, `-` functions to the environment, but not `define` and `function`. (Think why we can't.)

By doing so we would be able to remove some code:

```diff
const evaluate = (ast, environment = {}) => {
  // ...
  // function call handling
  let [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
- if (name === "+") {
-   return evaluate(first, environment) + evaluate(second, environment);
- } else if (name === "-") {
-   return evaluate(first, environment) - evaluate(second, environment);
- } else if (name === "define") {
+ if (name === "define") {
    // ...
    if (
      environment[first] !== undefined ||
-     first === "+" ||
-     first === "-" ||
      first === "define" ||
      first === "function"
    ) {
      throw new RuntimeError(`Can't redefine "${first}" variable`);
    }
    // ...
  }
};
```

Move functions to environment:

```js
const defaultEnvironment = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b
};

const evaluate = (ast, environment = { ...defaultEnvironment }) => {
```

Add logic to handle function call:

```js
const evaluate = (ast, environment = { ...defaultEnvironment }) => {
  // ...
  if (name === "define") {
    // ...
  } else {
    if (isNativeFunction(environment[name])) {
      return environment[name](
        evaluate(first, environment),
        evaluate(second, environment)
      );
    }
    if (isFunction(environment[name])) {
      // ...
    }
  }
};
```

## PS

This is just a start for functions. We still need to cover a lot of subjects, but the basic idea is in place.

Source code for this post is [here](https://github.com/stereobooster/write-a-language/tree/master/04.function) and [here](https://github.com/stereobooster/write-a-language/tree/master/05.functions-in-environment).
