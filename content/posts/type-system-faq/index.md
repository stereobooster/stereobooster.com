---
title: "Type System FAQ"
date: 2019-07-29T21:53:33+02:00
draft: false
tags: [explainlikeimfive, computerscience, typescript, beginners]
discuss:
  devto: type-system-faq-3oi0
  hn: 20559701
---

The post is inspired by [this thread](https://dev.to/parkroolucas/typescript-is-a-waste-of-time-change-my-mind-pi8). People have so much misconception about types, use the wrong terminology and get to wrong conclusions. I'm not advocating static type system, my only concern let's use right terminology so we can have a constructive discussion.

**I wrote this post spontaneously. I hope there are no errors, but ping me if you find something. Feel free to ask more questions.** Let's solve this once and for all.

## Dynamic vs Untyped

Some people consider the dynamic type system to be the same as untyped. This is incorrect. The untyped type system is the system where there is no sense to distinguish types. And there is no sense to distinguish types if there is only one type. For example:

- assembly language: the only one type is bit strings
- lambda-calculus: the only one type is lambdas

Not a big deal, you may say, dynamic or untyped whatever. Actually, this is a big deal, because when you equate dynamic and untyped you automatically make the dynamic opposite of static type system, so people divided into two camps dynamic vs static types (which is incorrect, see dynamic vs static).

> Languages that do not restrict the range of variables are called untyped languages: they do not have types or, equivalently, have a single universal type that contains all values.
>
> -- [Type Systems, Luca Cardelli](http://lucacardelli.name/papers/typesystems.pdf)

---

> Untyped — programs simply execute flat out; there is no attempt to check “consistency of shapes”
>
> Typed — some attempt is made, either at compile-time or at run-time, to
> check shape-consistency
>
> -- Type Systems for Programming Languages, Benjamin C. Pierce

## Dynamic vs static

The dynamic type system is a system in which types are checked dynamically (at runtime).
The static type system is a system in which types are checked statically (at compile or transpile time).

Are they opposite? No, they are not. They are both about types. You can have both, in fact, most of the static type system has dynamic type checks as well. As an example, we can take any IO (input-output) validation. Imagine you need to read the input from the user, which suppose to type in the number. You will check at runtime if parsing of the string gives you number or not (it can throw an exception or return NaN). When you check if given input can be considered as number or not you do dynamic type checking.

So no it is not a war of static vs dynamic types. You can use both.

Even more: static type checking is a complex process it is sometimes very hard to verify some part of the program statically, so you can fall back to dynamic type checking instead of static.

Think of static type system as statically checked types.

Think of dynamic type system as dynamically checked types.

## Isn't static types is when you know types at compile time?

No. If you open the source code of any parser (including JS) you would see that parser knows types of values at parse time (which is part of compile process).

```js
let x = "test";
```

Parser knows that `"test"` is a string. Does this make JS statically typed? No.

## Gradual type system

The gradual type system is a static type system which allows skipping type checking of parts of the program, for example, `any` or `@ts-ignore` in typescript.

From one side, it makes it less safe. From another side, gradual type system allows adding types gradually to dynamically typed languages.

## Sound vs unsound type system

The sound type checker is a checker which would not "approve" program with type errors. So if you use unsound type checker you still can have type errors in your application 😱. Do not panic. In practice, it may not affect you. Soundness is a mathematical property of type check algorithm, you need to prove it. A lot of compilers(type checkers inside) out there are unsound.

If you want to work with a sound type system take a look at ML-family, which uses Hindley–Milner type system.

You need as well understand that sound type system will not pass invalid program (false positives), but as well it may reject valid program (false negatives).

Type system which never rejects valid program is called complete.

Can I have both - sound and complete? As far as I know, they don't exist. I'm not sure, but it seems it is fundamentally impossible, based on Gödel's incompleteness theorem (**I can be wrong** about this one).

## Weak vs strong

I don't consider this terminology useful, because it's ambiguous and can create more confusion than clarity:

> These languages can be **euphemistically** called weakly checked (or weakly typed, in the literature) meaning that some unsafe operations are detected statically and some are not detected. **Languages in this class vary widely** in the extent of their weakness.
>
> -- [Type Systems, Luca Cardelli](http://lucacardelli.name/papers/typesystems.pdf)

---

> Probably the most common way type systems are classified is "strong" or "weak." This is unfortunate, since these words have **nearly no meaning at all**. It is, to a limited extent, possible to compare two languages with very similar type systems, and designate one as having the stronger of those two systems. Beyond that, the words mean nothing at all.
>
> -- [What To Know Before Debating Type Systems, Steve Klabnik](http://blog.steveklabnik.com/posts/2010-07-17-what-to-know-before-debating-type-systems)

---

> The terms "strong" and "weak" are **extremely ambiguous**. Here are some ways that the terms are used:
>
> - Sometimes, "strong" means "static". That's easy enough, but it's better to say "static" instead because most of us agree on its definition.
> - Sometimes, "strong" means "doesn't convert between data types implicitly". For example, JavaScript allows us to say "a" - 1, which we might call "weak typing". But almost all languages provide some level of implicit conversion, allowing automatic integer-to-float conversion like 1 - 1.1. In practice, most people using "strong" in this way have drawn a line between "acceptable" and "unacceptable" conversions. There is no generally accepted line; they're all arbitrary and specific to the person's opinions.
> - Sometimes, "strong" means that there's no way to escape the language's type rules.
> - Sometimes, "strong" means memory-safe. C is a notable example of a memory-unsafe language. If xs is an array of four numbers, C will happily allow code that does xs[5] or xs[1000], giving whatever value happens to be in the memory addresses after those used to store xs.
>
> -- [Types - Programmer's Compendium, Gary Bernhardt](https://www.destroyallsoftware.com/compendium/types?share_key=baf6b67369843fa2)

## Do statically typed languages require type declarations?

Not always. Sometimes type system can infer types (guess based on the code structure). For example (TypeScript),

```ts
const x = "test";
```

Type system knows that `"test"` is a string (because of parsing rules). Type system knows that `x` is constant, e.g. it can't be reassigned, so it can conclude that `x` is a string.

Other example (Flow):

```js
const add = (x, y) => x / y;
//                        ^ Cannot perform arithmetic operation because string [1] is not a number.
add(1, "2");
```

Type checker sees that we call `add` with number and string, it traces back it to the definition. Type checker knows that division operation expects numbers as inputs, so it says this an error to use string as one of the inputs.

Ther are no type declarations, yet we can do static type check. In the real world sooner or later you will have to write some types because type system can't infer everything. But statically typed languages are not about declarations, they are about type check before runtime.

## Is TypeScript unsafe because it compiles down to JavaScript?

TypeScript is unsound, so it can produce unsafe applications, but it has nothing to do with what it compiles to.

Most of the compilers for desktop compile program down to assembly language, which has even less safety than JS `¯\_(ツ)_/¯`.

You may ask: but compiled code runs in the browser and JS is unsafe, it can give, for example, null value when string expected.

Good question. So TS can guarantee safety inside the application, you need to put "guards" around the places where TS interacts with outside world e.g. you need to validate IO (input-output): user input, server responses, read from browser storage, etc.

For example, in Elm, they use ["ports"](https://guide.elm-lang.org/interop/ports.html) for this. In TS you can use io-ts or similar.

This "guard" creates a bridge between the static type system and a dynamic type system.

Simplified example:

```ts
const makeSureIsNumber = (x: any) => {
  const result = parseFloat(x);
  if (isNan(result)) {
    throw Error("Not a string");
  }
  return result;
};
const read = (input: any) => {
  try {
    const n = makeSureIsNumber(input);
    // in this branch of code, n is for sure number
    // otherwise, we would get into a different branch of code
    // makeSureIsNumber "proofs" that n is number
  } catch (e) {}
};
```

## Are types only required for the compiler?

> Types are just a hack to give hints to your compiler.
>
> -- Wout Mertens

It's a philosophical question. Types are needed for people, not for machines. Compilers need types because those are programs written by humans.

Types as phenomena exist because of people, there are no types unless there is somebody who would observe them. It's human mind put different things in different buckets (or categories). Without an observer, they don't make sense.

Here is a thought experiment for you. Think about "game of life". You have a two-dimensional grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

- Any live cell with fewer than two live neighbors dies, as if by underpopulation.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies, as if by overpopulation.
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

It is a bunch of squares which "blink" (turn on and off). Play with it [online](https://bitstorm.org/gameoflife/).

But then you have some structures, like "glider":

{{< simg src="glider.gif" width="360" height="360" alt="glider structure in game of life">}}

Can you see it? It is glider moving across the screen, right? Now pause. Does it actually exist? It just separates squares which appear and disappear. But our brain can observe the structure as an entity.

Or we can say it exists because squares are not independent (they depend on the neighbors), and even if glider itself doesn't exist, but the concept of the glider as platonic idea exist.

Now think about any program in a typed programming language. We can see types, right? But it is compiled down assembly code. Assembly code and program represents the same thing, the same logic (the second one is harder to read for human). From a computer point of view, there are no types, there are only bit strings - a collection of 0s and 1s (dead, alive cells). **Types exist for people**.

## More questions to be discussed

- Why we need types?
- What is type?
- Types vs tests
- Types vs classes
  - Nominal vs structural typing
  - Liskov principle
- Types vs sets
- Type theory vs logic (types vs proofs)
- Are JS, Ruby etc. untyped?

## PS

My previous attempts to write about types:

- https://github.com/stereobooster/pragmatic-types
- https://dev.to/t/pragmatictypes

Those articles need updates and some rework, I want to incorporate them in this FAQ.
