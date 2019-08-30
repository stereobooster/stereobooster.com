---
title: "Function, procedure, method, operator..."
date: 2019-08-30T17:25:32+02:00
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript, function]
description: "What is common in function, lambda, procedure, routine (subroutine), program (subprogram), application (as a noun), algorithm, method, closure, operator (operation)? All of them are computations."
---

There is so many terminology which means the same or almost the same. Let's figure out what is what.

What is common in function, lambda, procedure, routine (subroutine), program (subprogram), application (as a noun), algorithm, method, closure, operator (operation)? All of them are computations.

> There are several ways to define computation. For now, I take the simplest: **a computation is a sequence of steps, which I call a behavior**. There are three common choices for what a step is, leading to **three different kinds of behavior**:
>
> - Action Behavior...
> - State Behavior...
> - State-Action Behavior...
>
> -- [Computation and State Machines](https://lamport.azurewebsites.net/pubs/state-machine.pdf). Leslie Lamport, 19 April 2008

## Function vs procedure

There is a mathematical definition of function (I wrote about it [here](https://stereobooster.com/posts/from-function-to-closure/)):

  - takes at least one input
  - produces one output
  - for the same input always produce the same output
  - doesn't have any side effects - e.g. the only result of executing function is its output nothing else happening

From mathematical PoV, the function is the same as lambda (can be denoted as greek letter λ).

But not all programming language follow the strict definition (I guess for historical reasons). For example, JavaScript:

Same input but different result:

```js
let counter = 0;
const increase = (x) => counter += x;
increase(1) !== increase(1)
```

Result of the function is not communicated with return value but rather with a side effect:

```js
console.log('Hello, world!');
// Outputs Hello, World
// Returns undefined
```

No input value:

```js
Date.now();
```

This is not a strict rule because we can think about it as:

```js
Date.now(undefined);
```

Some programming languages, for example, try to distinguish functions and "none-functions". For example, [Pascal](https://wiki.freepascal.org/):

> A procedure is a routine that does not return a value.
> A function is a routine that, in contrast to procedures, returns a value.
> A routine is a re-usable piece of source code that performs some functionality.

The problem is that Pascal doesn't restrict usage of side-effects inside functions, so division is not precise.

Some programming languages don't have "none-functions" at all, for example, Haskell. How do they handle side effects then? They use monads to model IO (a subject for a different article).

## Routine, program, application

Definition for routine from [Pascal](https://wiki.freepascal.org/):

> A routine is a re-usable piece of source code that performs some functionality.

From [The C Programming Language](https://www.dipmat.univpm.it/~demeio/public/the_c_programming_language_2.pdf):

> In C, a function is equivalent to a subroutine or function in Fortran, or a
procedure or function in Pascal. A function provides a convenient way to
encapsulate some computation, which can then be used without worrying about its implementation.

All of those are the same: routine (subroutine), program (subprogram), application (as a noun) - some re-usable computations.

For example, in Bash, you can treat separate programs (or applications, or binaries, or executables) as "functions" - e.g. take the output from one program and pass (pipe) it to another one.

```bash
cat /var/log/syslog | grep 'post'
```

`cat` - concatenate files and print on the standard output.
`grep` - print lines matching a pattern.

## Algorithm

> Algorithm - a step-by-step procedure for solving a problem or accomplishing some end
>
> -- [Merriam-Webster](https://www.merriam-webster.com/dictionary/algorithm)

In a broad definition, Algorithm is equivalent to computation. Sometimes people refer algorithm as pre-made solutions (in the same vein as design patterns):

> Algorithms — methods for solving problems that are suited for computer implementations. Algorithms go hand in hand with data structures — schemes for organizing data
>
> -- [Algorithms, 4th Edition, Robert Sedgewick and Kevin Wayne. A](https://algs4.cs.princeton.edu/10fundamentals/)

Compare to:

> A design pattern is a three-part rule, which expresses a relation between a certain context, a problem, and a solution. The pattern is, in short, at the same time a thing, ..., and the rule which tells us how to create that thing, and when we must create it.
>
> -- A Pattern Language: Towns, Buildings, Construction, 1977

## Closure and method

Closure is a computation (function) with environment attached to it. For example, in JavaScript:

```js
const True = (x) => (y) => x;
const condition = True('then');
condition('else') === 'then';
```

`condition` is the function, with environment attached to it. Environment encolosing `condition` contains `x` so it works, but there is not `x` outside of this closure:

```js
const NotTrue = (z) => (y) => x;
const condition = NotTrue('then');
condition('else'); // Uncaught ReferenceError: x is not defined
```

The method is a computation (function) with the object attached to it. Typically attached object is accessible through `this` or `self` keywords. For example, in JavaScript:

```js
class DogClass {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return `${this.name} is a good dog!`;
  }
}
const belka = new DogClass('Belka');
belka.bark();
```

`bark` is the method.

In some PL passing of object is explicit, for example, in [Lua](https://www.lua.org/pil/16.html):

```lua
function Account.withdraw (self, v)
  self.balance = self.balance - v
end
```

## Operator

In math:

> Operator is a symbol or function representing a mathematical operation.
>
> -- [WolframAlpha](https://www.wolframalpha.com/input/?i=operator)

In math operator can be treated as a special version of the function, typically operator takes two arguments and uses infix notation (e.g. it is placed between symbols). For example, infix notation:

```text
1 + 1
```

Prefix notation:

```text
f(a, b) = a + b
f(1, 1)
```

Nobody uses this notation but it would be the same: `+(1, 1)`.

In PL operators can have a different treatment then functions. For example, in JavaScript, there is [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Conditional_(ternary)_operator).

```js
age = 20
(age >= 18) ? console.log('adult') : console.log('minor');
// outputs adult
// returns undefined
```

If we would want to implement the same thing as a function:

```js
const ternary = (condition, thenAction, elseAction) => {
  if (condition) {
    return thenAction;
  } else {
    return elseAction;
  }
}
ternary(age >= 18, console.log('adult'), console.log('minor'));
// outputs adult
// outputs minor
// returns undefined
```

The problem here is that `console.log('adult')`, `console.log('minor')` are executed before passing to ternary function. We can fix it by wrapping actions into functions (`() => ...`):

```js
const ternary = (condition, thenAction, elseAction) => {
  if (condition) {
    return thenAction();
  } else {
    return elseAction();
  }
}
ternary(age >= 18, () => console.log('adult'), () => console.log('minor'));
```

But as you can see the operator is treated differently than function (in JS).

On the other hand, there are languages which don't have this problem, for example, in [Haskell](https://wiki.haskell.org/If-then-else) it would be possible to implement `if` as function, without need for wrapping in additional function. Because Haskell is doing lazy evaluation aka call-by-need.

In some languages methods and some operators can be the same, for example, in Ruby:

```ruby
a + b
```

Is the same as:

```ruby
a.+(b)
```

It is confusing terminology which varies from one PL to another.

## Routine and closure

From compilation point of view sometimes people differentiate routines (think of C functions) and closures. Because routine can be implemented as a trivial pointer, but [closure compilation would need more work](http://matt.might.net/articles/closure-conversion/).
