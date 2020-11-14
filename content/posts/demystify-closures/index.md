---
title: "Demystify Closures"
date: 2019-08-24T15:07:27+02:00
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript, function]
series: "Demystify Programming Languages"
description: In the previous post we implemented functions, but not about closures. Let's fix this.
discuss:
  devto: demystify-closures-5g42
---

In the previous post we implemented functions, but not about [closures](/posts/from-function-to-closure/). Let's fix this.

<!--more-->

## The problem

Without closures following code snippet doesn't work as expected:

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

It will result in an error (`Can't find "y" variable...`) but we want it to return `4`.

Closures will fix this problem because closure is a function with environment attached to it e.g. `(function (i j) ...` will have access to local variables of parent function `(function (x y)`.

This kind of variable resolution (nested scopes) is called lexical scope.

## The solution

The solution is to store the environment (at which function was created) together with function. The function which comes with environment called closure.

> Closures are data structures with both a code and a data component.
>
> -- [Closure conversion: How to compile lambda](http://matt.might.net/articles/closure-conversion/)

For now, we store a function as a list with 3 items: symbol "function", list of arguments, the body of the function. Let's store environment as the fourth item:

```js
const evaluate = (ast, environment = { ...defaultEnvironment }) => {
  // ...
  const [name, first, second] = ast;
  const numberOfArguments = ast.length - 1;
  if (name === "define") {
    // ...
  } else if (name === "function") {
    return [name, first, second, environment];
  } else {
    // ...
  }
};
```

And when we call the function we need to use closure's environment along with "global" environment:

```js
const evaluate = (ast, environment = { ...defaultEnvironment }) => {
  // ...
  if (name === "define") {
    // ...
  } else {
    // ...
    if (isFunction(environment[name])) {
      const [_, argumentNames, functionBody, closureEnvironment] = environment[
        name
      ];
      // create new environment from "global" and closure's environment
      const functionEnvironment = { ...environment, ...closureEnvironment };
      // add arguments to environment
      // ...
      return evaluate(functionBody, functionEnvironment);
    }
    throw new RuntimeError(`"${name}" is not a function`);
  }
};
```

And this is the whole secret behind closures. Note: proposed implementation of environment storage is not the most effective, because we will have a lot of copies of the environment.

## Local scope

What would you expect from the usage of `define` inside a function? The function has its local scope, all variables defined in this scope will stay in this scope (insert joke about Las Vegas here).

```repl
> (define testLocal
    (function (x)
      (define local x)
    )
  )
> (testLocal 10)
> (+ local 1)
```

This code snippet will produce error `Can't find "local" variable...`.

## Encapsulation

Encapsulation (a term often used in Object Oriented Programming) - is the way to provide isolation, for example, to prevent undesired data change, or to hide implementation details.

Closures provide encapsulation as well. Closure carries a piece of the environment which can contain variables nobody else can read (if the closure was created inside another function). In this sense, closure provides a way to isolate a piece of data.

## PS

Code for this post is [here](https://github.com/stereobooster/write-a-language/tree/master/06.closure). In the next post will probably talk about the evaluation strategies.