---
title: "If - procedural, functional, object-oriented"
date: 2019-08-28T18:03:50+02:00
draft: false
series: "fp vs oop"
tags: [beginner, explainlikeimfive, computerscience, javascript, if]
description: "Let's talk about the if statement. A lot of people view it as the corner-stone of programming"
discuss:
  devto: if-procedural-functional-object-oriented-a4d
---

Let's talk about the `if` statement. A lot of people view it as the corner-stone of programming, for example, whenever I discuss the question if CSS is a programming language or not (it is) somebody would say: "CSS doesn't have `if` statement so it can't be considered as PL". I don't know where this idea comes from. `if` statement is one of the many control flow structures, like goto, jump, exceptions, loops, etc.

## Procedural

I guess the most known form of `if` is it's "procedural" (or [structured](https://pdfs.semanticscholar.org/013b/f90f472e49c05263b90d9e36f8d2705e7fc7.pdf)) form:

```js
if (condition) {
  thenAction();
} else {
  elseAction();
}
```

By "procedural" I mean the type of imperative programming, but more organized than just Von Neumann machine. (Imperative style of programming is when you give direct instructions to the machine do step 1, step 2, etc.)

Instead of the precise definition, I will give examples:

- Most imperative languages: assembly, Fortran.
- Less imperative languages, so-called "procedural" or [structured](https://pdfs.semanticscholar.org/013b/f90f472e49c05263b90d9e36f8d2705e7fc7.pdf)): Algol, Pascal (I guess Go as well).

## Functional

To impelemnt `if` in functional style we need to restrict ourselves to functions only:

```js
// Implementation:
const True = (x) => (y) => x;
const False = (x) => (y) => y;
const If = (condition, thenAction, elseAction) => {
  const action = condition(thenAction)(elseAction);
  return action();
}
// Usage:
If(condition, thenAction, elseAction);
```

This idea is a direct translation of Church Encoded `True`, `False` in lambda calculus:

```
True = λx.λy.x
False = λx.λy.y
```

## Object-oriented

To impelemnt `if` in functional style we need to restrict ourselves to objects only:

```js
// Implementation:
class TrueClass {
  Then(callBack) {
    callBack.call()
    return this
  }
  Else(callBack) {
    return this
  }
}
class FalseClass {
  Then(callBack){
    return this
  }
  Else(callBack){
    callBack.call()
    return this
  }
}
const True = new TrueClass();
const False = new FalseClass();
// Usage:
// const condition = True
condition.Then(thenAction).Else(elseAction)
```

## Conclusions

In practice, a lot of OOP and [FP languages](https://wiki.haskell.org/If-then-else) use procedural-style `if` (you can get away without it).

The reason I presented those examples is to show "pure" FP and OOP implementations so you could compare them. For the full picture, I need to mention that OOP example is SmallTalk style, and SmallTalk took some inspiration from Scheme, which in turn uses ideas from lambda calculus `¯\_(ツ)_/¯`. Some people would argue definition of "pure" OOP as SmallTalk, let's leave it for another article.
