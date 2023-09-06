---
title: "Is this a type error? (2)"
date: 2020-11-12T22:20:40+01:00
draft: false
tags: [programming, computerscience, type-system, function]
cover: is-this-a-pigeon.jpg
---

Continuation of previous post: [Is this a type error?](/posts/is-this-a-type-error/).

[I wrote a small lisp-like language](/posts/demystify-variables/). To create a variable in this language you would write:

```lisp
(define x 1)
```

in JavaScript, you would write:

```js
const x = 1;
```

Because `define` is structurally similar to a function, language handles it in the same manner (but it doesn't evaluate the first argument).

It is possible to write, for example:

```lisp
(define 1 1)
```

But this is an error, first argument suppose to be "symbol", not a number. So I added following check:

```js
if (typeof first !== "string") {
  throw new TypeError(
    `"${name}" expects symbol as the first argument, instead got "${first}"`
  );
}
```

In this language, this considered to be a type error, but in many other languages it would be a syntax error, for example, in JS:

```js
const 1 = 1
// SyntaxError: missing variable name
```

I can change the code - move this check to the parser, then an error will become syntax error. On the other side if I will add `quote` and `eval` to the language I still can get this error (at eval stage):

```lisp
(eval (quote (define 1 1)))
```

Just another interesting case of how the same error can be interpreted as a type error or not depending on the point of view.
